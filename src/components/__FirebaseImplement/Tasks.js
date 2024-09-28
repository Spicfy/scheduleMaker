class Task {
    #taskTitle; 
    #taskDescription; 
    #taskStarTime;
    #taskEndTime; 
    #taskDuration;
  
    constructor() {
      this.#taskTitle = "";
      this.#taskDescription = "";
      this.taskStarTime = "";
      this.#taskEndTime = "";

      this.#taskDuration ="";
    }
  
    // getters
    getTaskTitle() {
      return this.#taskTitle;
    }
  
    getTaskDescription() {
      return this.#taskDescription;
    }
  
    getStarTime() {
      return this.#taskStarTime;
    }

    getStarTime() {
        return this.#taskEndTime;
      }
  }