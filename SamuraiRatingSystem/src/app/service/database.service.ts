import { Router, ActivatedRoute } from '@angular/router';
import { Criteria, Question } from './../model/Criteria';
import { Team } from './../model/Teams';
import { Member } from './../model/Member';
import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as Firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { AngularFireStorage } from 'angularfire2/storage';
// import { Criteria } from '../model/Criteria';
// import from 'rxjs/operators/map'

@Injectable()
export class DatabaseService {
  public user$: Observable<Firebase.User>;

  allTeams;
 public SneakedTeam;



    userList;
    teamList;
    criteriaList;
    criteria: Criteria[] = [];
    haveAccount: Boolean;
    teamKey;
    teams: Team[] = [];
    members: Member[] = [];
    displayName: string;
    photoURL: string;
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    filePath: string;

    teams_collectionRef = this.afs.collection<Team>('Teams');
    criteria_collectionRef = this.afs.collection<Criteria>('criteria');
    user_collectionRef = this.afs.collection<User>('users');
    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        private router: Router,
        private storage: AngularFireStorage,
        ) {
    this.user$ = afAuth.authState;

    // // Lists all the users in the DB
    // this.userList = this.afs.collection('Users').snapshotChanges().map(changes => {
    //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

    // // Lists all the teams in the DB
    // this.teamList = this.afs.collection('Teams').snapshotChanges().map(changes => {
    //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });

    // this.criteriaList = this.afs.collection("Criteria/Questions").snapshotChanges().map(changes => {
    //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
    }

    getTeams(): Observable<Team[]> {
       return this.teams_collectionRef.valueChanges();
    }

    getUsers() {
        return this.user_collectionRef.valueChanges();
    }

    getCriteria() {
        return this.criteria_collectionRef.valueChanges();
    }




  
    uploadProfilePicture(event, name){
        const file = event.target.files[0];
        this.filePath = ''+ name + '-logo';
        const task = this.storage.upload(this.filePath, file);

        this.uploadPercent = task.percentageChanges();
        this.downloadURL = task.downloadURL();
    }

    getFilePath(){
        return this.filePath;
    }

    getUploadPercentage(){
        return this.uploadPercent;
    }


    getDownloadUrl(){
        return this.downloadURL;
    }


    getData(collection: string,  variable:string, operator: any, value: any){
        return  this.afs.collection(collection, ref => ref.where(variable, operator, value))
        .valueChanges().map(response => {
          // console.log(response);
          return response;
        });
    }


    googlePopup() {
        const prov = new Firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(prov).then(
            (success) => {
                // alert('User added');
                let flag: Boolean;
                // tslint:disable-next-line:no-shadowed-variable
                this.userList.forEach(element => {
                    for (let i = 0; i < element.length; i++) {
                        console.log(element[i].User + 'here');
                        if (element[i].User === this.getCurrentUsersID()) {
                            flag = false;
                            break;
                        }
                    }

                    if (flag === undefined) {
                        alert('User added');

                        // If this is the first time, the team chosen by the user is added to his account
                        // The name will be the chosen team
                        this.createUser(this.getCurrentUsersID());

                    } else {
                        alert('Welcome Back Bro');
                        this.router.navigate(['/dashboard']);

                    }
                });

        }).catch(
            (err) => {
                console.log(err.message);
        });
    }

    // Must add the name and pictureURL
    createUser(id) {

        // this.afs.collection("/Users/").push({
        //     Teams: { TeamID: this.getTeamKey() },
        //     Name: this.getUserName(),
        //     PictureURL: this.getUserPicture(),
        //     User: id,
        // });

        // // this.afs.collection("/Teams/" + this.getTeamKey() + "/Members/").push({
        // //     Members: { UserID: id },
        // // });
    }

    createTeam(team: Team) {

        this.teams_collectionRef.doc('' + team.Name).set(Object.assign({}, team)).then(success => {
            console.log('success!');
        }).catch(err => {
            console.log(err.message);
        });

        // let flag: Boolean;
        // // tslint:disable-next-line:no-shadowed-variable
        // this.teamList.forEach(element => {
        //     for (let i = 0; i < element.length; i++) {
        //         console.log(element[i].Name + 'Name of team from DB');
        //         if (element[i].Name === name) {
        //             flag = false;
        //             break;
        //         }
        //     }
        //     if (flag === undefined) {
        //         alert('Team created');
        //         // Adds the new team to the database if it's not there already
        //         this.afs.collection("/Teams/").push({
        //             Name: name,
        //             Picture: pictureURL,
        //             Pin: pin,
        //             Rating: 0
        //         });
        //     } else {
        //         alert('Team already exists');
        //     }
        // });

    }

            // Focus on this

            getTeamMembers(key) {

              for (let i = 0; i < this.teams.length; i++)  {
                console.log(this.teams[i].Members[i].UserID);
              }


        // tslint:disable-next-line:no-shadowed-variable
        this.teamList.forEach(element => {
          for (let i = 0; i < element.length; i++) {

            // console.log(element[i].key + "key");
            // console.log(element[i].Members);
            // console.log(element[i].Name);
                // console.log(element[i].Picture);
                // console.log(element[i].Pin);
                // console.log(element[i].Rating);

                // this.teams.push(
                  //     new Team(element[i].key, element[i].Members,
                  //  element[i].Name, element[i].Picture, element[i].Pin, element[i].Rating)
                  // );

                  // console.log(this.teams[i].Key);

                  // console.log(element[i].User + "here")
                // if(element[i].User == this.getCurrentUsersID()){
                  //     this.haveAccount = true;
                  // }

                  if (element[i].key === key) {

                    for (const z = 0; i < element[i].Members.length; i++) {
                      this.members.push(
                        new Member(element[i].Members[z].UserID)
                      );
                    }
                  }
                }

        });

      }

    // getCriteria() {

    //     let array = [];
    //     this.criteriaList.forEach(element => {
    //         for(let i = 0; i < element.length; i++){

    //             array.push(
    //                 new Criteria(element[i].Question)
    //             )

    //             console.log(element[i].Question)

    //         }
    //         this.criteria = array;
    //         console.log("whuu " + this.criteria + " shem!")
    //     });

    // }

    // Don't run this again
    createCriteria(question) {
        // this.afs.collection("/Criteria/Questions").push({
        //     Question: 'What do you feed dogs'
        // });
    }

        deleteCriteria(key) {

        }

        getCurrentUsersID() {
        return this.afAuth.auth.currentUser.uid;
      }

    getUserName() {
      return this.afAuth.auth.currentUser.displayName;
    }

    // This is the URL ne broes, just saying you know
    getUserPicture() {
      return this.afAuth.auth.currentUser.photoURL;
    }

    setTeamKey(key) {
      this.teamKey = key;
    }

    getTeamKey() {
        return this.teamKey;
      }

      logout() {
        this.afAuth.auth.signOut().then(() => {
          this.router.navigate(['/login']);
        });
    }


    // getAllTeams() {
    //   this.allTeams = this.afDB.list('/Users');
    //   console.log('got this from getall: ' + this.allTeams.Name);
    //   return this.allTeams;

    // }

    // getmyteam() {
      // this.afs.collection('/Teams/' + this.getTeamKey() + '/')

    // assignTeamDetails() {
    //   this.givenTeamKey = this.route.queryParams.subscribe(params => {
    //     this.givenTeamKey = params['team'];
    //   });
    //    this.getAllTeams();
    //   console.log('All teames in teamview: ' + this.allTeams.Key);
      // tslint:disable-next-line:no-shadowed-variable
      // this.allTeams.forEach(element => {
      //   for (let i = 0; i < element.length; i++) {
      //     if (element[i].key === this.givenTeamKey) {
      //       this.givenTeamKey = element[i];
      //     }
      //   }
      // });
      // }

  }


