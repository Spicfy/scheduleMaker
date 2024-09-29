// userTasks.js
// basic dataStructure of an userTask structure stored in DB, hold by User
// class member: check in documentation

class userTasks {

    // 1. All members are private
    #taskTitle; 
    #taskDescription; 
    #isCompleted; // Boolean, if completed
    #isPrioritized; // Boolean, yes/no
    // 2. Constructor
    constructor(taskTitle =" ", taskDescript=" ",isPrioritized = false,isCompleted=false) { 
      //by default, tasks not prioritized
      this.#taskTitle = taskTitle;
      this.#taskDescription = taskDescript;
    }

  
    // 3. Getters
    get TaskTitle() {
      return this.#taskTitle;
    }
  
    get TaskDescription() {
      return this.#taskDescription;
    }

    get isCompleted()
    {
        return this.#isCompleted;
    }

    get isPrioritized()
    {
        return this.#isPrioritized;
    }

    // 4. Accessors
    set taskTitle(value) {
        this.#taskTitle = value;
    }
    set taskDescript(value) {
      this.#taskDescription = value;
    }
    set isPrioritized(value) {
      this.#isPrioritized = value;
    }
    set isCompleted(value) {
      this.#isCompleted = Boolean(value); // Must be boolean
    }

  }

  export default userTasks; // 6. Export Task.js such that User can use
  
    // Not-implementing in this DEMO version
    /*  #taskStartTime;
    #taskEndTime; 
    #taskDuration; 
    #isNegotiable;// Boolean, if negotiable
    static TIME_TASK_START = "00:00"; 
    static TIME_TASK_END = "23:59"; 

      this.taskStartTime = taskStartTime;
      this.#taskEndTime = taskEndTime;
      this.#taskDuration = User.getDuration(this.#taskStartTime, this.taskEndTime); // calculate duration
      this.#isNegotiable = false; // false by default
      */
    /*
    get StarTime() {
      return this.#taskStartTime;
    }

    get EndTime() {
        return this.#taskEndTime;
    }

    get TaskDuration() {
        return this.#taskDuration;
      }
*/
/*
    get isNegotiable()
    {
        return this.#isNegotiable;
    }
        */
    // Not implementing in this version
    /*Setter for taskStartTime
    set taskStartTime(value) {
        this.#taskStartTime = value;
    }

    // Setter for taskEndTime
    set taskEndTime(value) {
        this.#taskEndTime = value;
    }

    // Setter for isNegotiable
    set isNegotiable(value) {
        this.#isNegotiable = Boolean(value); // Must be boolean
    }*/

    /*-------------------------------------
    //   5. Caculate duration of Task
    //-------------------------------------
    // getDuration of Task
    static getDuration(start, end) {
        const startMinutes = this.timeToMinutes(start);
        const endMinutes = this.timeToMinutes(end);
    
       /* if (endMinutes < startMinutes) {
          console.log("ERROR");
          return 0; //
        }
        return endMinutes - startMinutes; // Duration in minutes
      }
    // Utility: time to minutes
      static timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes; // Convert to minutes
      }
    */
   /*
       // Setter for taskDescription
       set taskDescription(value) {
        this.#taskDescription = value;
    }
    set taskDifficulty(value) {
      if (value <0 || value >2) {
      throw new Error("difficulty must be between 0-2");
      }
      this.#taskDifficulty = value;
    }
    this.#taskDifficulty; // will set to 1 BY DEFAULT
    #taskDifficulty; // preset to 1
    get TaskDifficulty() {
        return this.#taskDifficulty;
      }
    */