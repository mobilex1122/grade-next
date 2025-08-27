import { Injectable } from '@angular/core';
import Database from '@tauri-apps/plugin-sql';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from './state';


export type Grade = {
  id: number,
  name?: string,
  grade: number,
  weight: number
}

export type Subject =  {
  id: number,
  name: string,
  grades: Grade[]
}

export type SubjectSql =  {
  id: number
  name: string
}

export type SimpleSubject =  {
  id: number
  subject: string,
  average: number | null
}

export type Subjects =  SimpleSubject[]

export type DBError =  {
  msg: string
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private db:Database | undefined;

  ready = false;

  private subjectsSubject = new BehaviorSubject<Subjects>([]);
  private changeSubject = new BehaviorSubject<null>(null);
  private erorsSubject = new BehaviorSubject<DBError | null>(null);

  constructor(private state:State) {
    this.ready = false;
    Database.load('sqlite:grades.db').then((db) => {
      if (db) {
        console.log("DB Ready to start")
        this.db = db
        console.log(this.db)
        this.ready = true;
        this.getSubjects()
      } else {
        console.error("DB Failed to start")
      }
    })
  }
  getSubjectsObserver() {
    return this.subjectsSubject.asObservable();
  }

  getErrorObserver() {
    return this.erorsSubject.asObservable();
  }

  async getSubjects() {

    if (this.ready && this.db) {

      this.db.select<Subjects>('SELECT * FROM subject_average').then((res) => {
        this.subjectsSubject.next(res)
      });
    } else {
      this.state.error("DB Not Ready!")
      console.error("DB Not Ready!" + this.ready + this.db)
    }

    this.changeSubject.next(null)
      
  }

  getChangeObserver() {
    return this.changeSubject.asObservable()
  }

  addGrade(subjectID: number, grade: number,weight = 1, name:string | null = null) {
      if (this.ready && this.db) {

        this.db.execute('INSERT INTO grades (grade,weight,name,subject) VALUES ($1,$2,$3, $4)', [grade,weight,name,subjectID]).then((res) => {
          console.log("Affected: " + res.rowsAffected)
          if( res.rowsAffected != 1 ) {
            this.state.error("Failed to add grade")
          } else {

          }

          this.getSubjects()
        }).catch((e) => {
        this.state.error("Failed to add grade.")
      });;
      } else {
        console.error("DB Not Ready!" + this.ready + this.db)
      }
  }

  getSubject(id:number)  {
    var data = new BehaviorSubject<Subject | undefined>(undefined)

    var handle = async () => {
      if (this.ready && this.db) {

        var subjectdata = await this.db.select<SubjectSql[]>('SELECT * FROM subjects WHERE id = $1', [id])
        if (subjectdata.length == 1) {
          var subject:Subject = {
            id: subjectdata[0].id,
            name: subjectdata[0].name,
            grades: []
          }
          var grades = await  this.db.select<Grade[]>('SELECT * FROM grades WHERE subject = $1', [id])


          subject.grades = grades

          data.next(subject)
          data.complete()

        } else {
          this.state.error("Can't Fetch Subject")
        }
      } else {
        this.state.error("DB Not Ready!")
        console.error("DB Not Ready!" + this.ready + this.db)
      }
    }
    handle();

    return data.asObservable()
  } 


  addSubject(name:string) {

    if (this.ready && this.db) {
      this.db.execute('INSERT INTO subjects (name) VALUES ($1)', [name]).then((result)=> {
        console.log("Add Sub Affected: " + result.rowsAffected)
        if( result.rowsAffected != 1 ) {
          this.state.error("ERROR: Failed to add subject")
        } else {
          this.state.success(`Added subject ${name}.`)
        }
        this.getSubjects()
      }).catch((e) => {
        this.state.error("Subject '"+ name +"' already exists!")
      });
    } else {
      this.state.error("DB Not Ready!")
    }
    
  } 

  renameSubject(id:number,name:string) {

    if (this.ready && this.db) {
      this.db.execute('UPDATE subjects SET name= $1 WHERE id = $2', [name, id]).then((result)=> {
        if( result.rowsAffected != 1 ) {
          this.state.error("ERROR: Failed to rename subject")
        } else {
          this.state.success(`Renamed subject to ${name}.`)
        }
        this.getSubjects()
      }).catch((e) => {
        this.state.error("Subject name '"+ name +"' already exists!")
      });
    } else {
      this.state.error("DB Not Ready!")
    }
  } 

  deleteSubject(id:number) {
    if (this.ready && this.db) {
      this.db.execute('DELETE FROM subjects WHERE id = $1', [id]).then((result)=> {
        if( result.rowsAffected != 1 ) {
          this.state.error("ERROR: Failed to Delete subject")
        } else {
          this.state.success(`Deleted subject ${name}.`)
        }
        this.getSubjects()
      }).catch((e) => {
        this.state.error("Subject name '"+ name +"' already exists!")
      });
    } else {
      this.state.error("DB Not Ready!")
    }
  }


  renameGrade(id:number,name:string) {

    if (this.ready && this.db) {
      this.db.execute('UPDATE grades SET name= $1 WHERE id = $2', [name, id]).then((result)=> {
        if( result.rowsAffected != 1 ) {
          this.state.error("ERROR: Failed to rename grade")
        } else {
          this.state.success(`Renamed grade to ${name}.`)
        }
        this.getSubjects()
      }).catch((e) => {
        this.state.error("Grade name '"+ name +"' already exists!")
      });
    } else {
      this.state.error("DB Not Ready!")
    }
  } 

  editGrade(id:number,name:string | null, grade: number, weight: number) {

    if (this.ready && this.db) {
      this.db.execute('UPDATE grades SET name= $1, grade = $2, weight = $3 WHERE id = $4', [name, grade,weight, id]).then((result)=> {
        if( result.rowsAffected != 1 ) {
          this.state.error("ERROR: Failed to edit grade")
        } else {
          this.state.success(`Edited grade.`)
        }
        this.getSubjects()
      }).catch((e) => {
        this.state.error("Grade exists!")
      });
    } else {
      this.state.error("DB Not Ready!")
    }
  } 

  deleteGrade(id:number) {
    if (this.ready && this.db) {
      this.db.execute('DELETE FROM grades WHERE id = $1', [id]).then((result)=> {
        if( result.rowsAffected != 1 ) {
          this.state.error("ERROR: Failed to Delete grade")
        } else {
          this.state.success(`Deleted grade ${name}.`)
        }
        this.getSubjects()
      }).catch((e) => {
        this.state.error("Grade name '"+ name +"' already exists!")
      });
    } else {
      this.state.error("DB Not Ready!")
    }
  }

}
