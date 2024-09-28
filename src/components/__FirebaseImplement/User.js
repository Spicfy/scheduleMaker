// User.js
// basic dataStructure of an User structure stored in DB
// class member: check in documentation
class User
 {
  // PART I registered on LoginSignUp
   #userEmail;
   #userPassword;

  // PART II 
  // If upon sign-in PART II information = default, abort PART I from DB (delete account)

    #userName; 
    static VALID_WORKING_STYLES = [-1, 0, 1, 2];
    #workingStyle;

    // related to tasks
    static MAX_FAVOURITE = 3;
    #favTasks;

    static TIME_DAY_START = "00:00"; //
    static TIME_DAY_END = "23:59"; // 
    #dayStart;
    #dayEnd;

    #ex_TimeSlot;// If workingSTYLE

    //Constructor
    
    
  };
  
  // 如果你需要创建多个用户对象，可以定义一个函数来创建它们
  export function createUser(name, age, skills, active) {
    return {
      name: name,
      age: age,
      skills: skills,
      active: active
    };
  }