import { Router, ActivatedRoute } from "@angular/router";
import { Criteria, Question } from "./../model/Criteria";
import { Team } from "./../model/Teams";
import { Member } from "./../model/Member";
import { element } from "protractor";
import { Injectable } from "@angular/core";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from "@firebase/auth-types";
import { AngularFireStorage } from 'angularfire2/storage';
import { Subscription } from "rxjs/Subscription";
// import { Criteria } from '../model/Criteria';
// import from 'rxjs/operators/map'

@Injectable()
export class DatabaseService {
  public user$: Observable<firebase.User>;

  displayPercentage: number;
  allTeams;
  public SneakedTeam;
  
  disableNav: boolean = false;
  hasBeenRemoved: boolean = false;
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
  member: Member = new Member();

  teams_collectionRef = this.afs.collection<Team>("Teams");
  criteria_collectionRef = this.afs.collection<any>("criteria");
  user_collectionRef = this.afs.collection<User>("users");
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.user$ = afAuth.authState;
  }

  getTeams(): Observable<any> {
    return this.afs
      .collection<Team>("Teams", ref => ref.orderBy("Rating", "desc"))
      .valueChanges();
  }

  getTeam(teamName: string) {
    return this.teams_collectionRef.doc("" + teamName);
  }

  getUsers() {
    return this.user_collectionRef.valueChanges();
  }

  getUser(uid: string) {
    return this.user_collectionRef.doc(uid);
  }

  getCriteria() {
    return this.criteria_collectionRef.valueChanges();
  }

  uploadProfilePicture(event, name) {
    const file = event.target.files[0];
    this.filePath = "" + name + "-logo";
    const task = this.storage.upload(this.filePath, file);
    this.uploadPercent = task.percentageChanges();
    this.downloadURL = task.downloadURL();
  }

  getFilePath() {
    return this.filePath;
  }

  getUploadPercentage() {
    this.setUploadPercentage();
    return this.displayPercentage;
  }

  setUploadPercentage() {
    this.uploadPercent.subscribe(response => {
      this.displayPercentage = response as number;
      console.log((this.displayPercentage = response as number));
    });
  }

  getDownloadUrl() {
    return this.downloadURL;
  }

  getData(collection: string, variable: string, operator: any, value: any) {
    return this.afs
      .collection(collection, ref => ref.where(variable, operator, value))
      .valueChanges()
      .map(response => {
        // console.log(response);
        return response;
      });
  }

  googlePopup() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        this.disableNav = false;
        if (response.additionalUserInfo.isNewUser) {
          this.createUser();
          this.router.navigate(["/registration"]);
        } else {
          this.router.navigate(["/dashboard"]);
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }

  // Must add the name and pictureURL
  createUser() {
    this.user_collectionRef
      .doc(this.afAuth.auth.currentUser.uid)
      .set(
        Object.assign(
          {},
          {
            team: "",
            displayName: this.afAuth.auth.currentUser.displayName,
            photoURL: this.afAuth.auth.currentUser.photoURL,
            UID: this.afAuth.auth.currentUser.uid
          }
        )
      )
      .then(success => {
        console.log("success!");
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  setTeam(member: Member, selectedTeam: string) {
    var team: Team = new Team();
    var prevTeam = member.team;
    team.Members.push(member);
    member.team = selectedTeam;
    // updates member
    this.user_collectionRef.doc(member.UID).update(Object.assign({}, member));

    // switch members
    this.switchTeam(prevTeam, member.UID);

    // update team
    this.teams_collectionRef.doc(selectedTeam).update(Object.assign({}, team));
  }

  switchTeam(prevTeam: string, UID: string) {
    var team;
    var subscription = this.teams_collectionRef
      .doc(prevTeam)
      .valueChanges()
      .subscribe(response => {
        team = response as Team;
        for (var i = 0; i < team.Members.length; i++) { 
          if (UID === team.Members[i].UID && !this.hasBeenRemoved) {
            team.Members.splice(i, 1);
           this.hasBeenRemoved = true;
          }
        }
        this.teams_collectionRef.doc(prevTeam).update(Object.assign({}, team));


      });

      
  }

  createTeam(team: Team) {
    return this.teams_collectionRef
      .doc(team.Name)
      .set(
        Object.assign(
          {},
          {
            Members: new Array<Member>(),
            Name: team.Name,
            Picture: team.Picture,
            Pin: team.Pin,
            Rating: 0
          }
        )
      )
      .then(success => {
        console.log('success!');
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  deleteTeam(teamName: string) {
    this.teams_collectionRef.doc(teamName).delete();
  }

  createQuestion(question: String) {
    this.criteria_collectionRef
      .doc(question.slice(0, 5))
      .set(Object.assign({}, question))
      .then(success => {
        console.log('successfully created crieria!');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

//   deleteCriteria(question: String) {
//     this.criteria_collectionRef.doc(question.slice(0, 5)).delete();
//   }

  createCriteria(question) {
    let mans = this.criteria_collectionRef.add(Object.assign({ question: question })).then(success => {
        console.log('success!');
    }).catch(err => {
        console.log(err.message);
    });
    }

    deleteCriteria(question) {
        console.log("Haybo");

        this.criteria_collectionRef.ref.where("question", "==", question)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            
            this.delete(doc.id);
        });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }

    delete(key){
        this.afs.collection("criteria").doc(key).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

  getTeamMembers(key) {}

  getCurrentUserID() {
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

  getDisableNav() {
    return this.disableNav;
  }
  updateRating(val: number, TeamName: string) {
    const ref = this.afs.doc(`Teams/${TeamName}`);
    console.log(ref.valueChanges);
    ref.update({ Rating: val });
  }
}
