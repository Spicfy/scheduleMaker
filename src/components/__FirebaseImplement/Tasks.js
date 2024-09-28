// Task.js
// basic dataStructure of an Task structure stored in DB, inside User
// class member: check in documentation

class Task {
    // 1. All members are private
    #taskTitle; 
    #taskDescription; 
    #taskStartTime;
    #taskEndTime; 
    #taskDuration;

    #isCompleted; // Boolean, if completed
    #isNegotiable;// Boolean, if negotiable
    #taskDifficulty;

    static TIME_TASK_START = "00:00"; 
    static TIME_TASK_END = "23:59"; 

    // 2. Constructor
    constructor(taskTitle =" ", taskDescript=" ",taskStartTime=" ",taskEndTime = " ",taskDifficulty = 1) {
      this.#taskTitle = taskTitle;
      this.#taskDescription = taskDescript;
      // MAKE SURE WILL NOT PASS TO  DB IF DURATION <0
      this.taskStartTime = taskStartTime;
      this.#taskEndTime = taskEndTime;
      this.#taskDuration = User.getDuration(this.#taskStartTime, this.taskEndTime); // calculate duration

    this.#isCompleted = false; // false by default
    this.#isNegotiable = false; // false by default

    this.#taskDifficulty; // will set to 1 BY DEFAULT

    }

  
    // 3. Getters
    get TaskTitle() {
      return this.#taskTitle;
    }
  
    get TaskDescription() {
      return this.#taskDescription;
    }
  
    get StarTime() {
      return this.#taskStartTime;
    }

    get EndTime() {
        return this.#taskEndTime;
    }

    get TaskDuration() {
        return this.#taskDuration;
      }

    get TaskDifficulty() {
        return this.#taskDifficulty;
      }
    
    get isCompleted()
    {
        return this.#isCompleted;
    }

    get isNegotiable()
    {
        return this.#isNegotiable;
    }
    // 4. Accessors
    set taskTitle(value) {
        this.#taskTitle = value;
    }

    // Setter for taskDescription
    set taskDescription(value) {
        this.#taskDescription = value;
    }

    // Setter for taskStartTime
    set taskStartTime(value) {
        this.#taskStartTime = value;
    }

    // Setter for taskEndTime
    set taskEndTime(value) {
        this.#taskEndTime = value;
    }

    // Setter for isCompleted
    set isCompleted(value) {
        this.#isCompleted = Boolean(value); // Must be boolean
    }

    // Setter for isNegotiable
    set isNegotiable(value) {
        this.#isNegotiable = Boolean(value); // Must be boolean
    }

    // Setter for taskDifficulty
    set taskDifficulty(value) {
        if (value <0 || value >2) {
        throw new Error("difficulty must be between 0-2");
        }
        this.#taskDifficulty = value;
    }

    //-------------------------------------
    //   5. Caculate duration of Task
    //-------------------------------------
    // getDuration of Task
    static getDuration(start, end) {
        const startMinutes = this.timeToMinutes(start);
        const endMinutes = this.timeToMinutes(end);
    
       /* if (endMinutes < startMinutes) {
          console.log("ERROR");
          return 0; //
        }*/
    
        return endMinutes - startMinutes; // Duration in minutes
      }
    // Utility: time to minutes
      static timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes; // Convert to minutes
      }
  }

  export default Task; // 6. Export Task.js such that User can use