const signUp = async (userEmail, userPassword) => {
  try {
      // 检查用户是否已存在
      const signInMethods = await fetchSignInMethodsForEmail(firebase.databaseAuth, userEmail);
      if (signInMethods.length > 0) {
          notyf.error("Account already exists.");
          return; // 如果用户已存在，不再继续
      }
      
      // 创建新用户
      const currentUserCredential = await createUserWithEmailAndPassword(firebase.databaseAuth, userEmail, userPassword);
      console.log('User signed up successfully!');
      notyf.success('User registered');

      const user = currentUserCredential.user;
      
      // 跳转到新的页面，并传递用户信息
      navigate('/UserInfoCollect', { state: { email: userEmail } });

  } catch (error) {
      console.error('Error signing up:', error.message);
      notyf.error('Error signing up.');
  }
};

const logIn = async (userEmail, userPassword) => {
  try {
      await signInWithEmailAndPassword(firebase.databaseAuth, userEmail, userPassword);
      console.log("User Logged in Successfully");
      notyf.success('Signed-In successfully!');

      // 跳转到新的页面，并传递用户信息
      navigate('/UserInfoCollect', { state: { email: userEmail } });

  } catch (error) {
      console.error('Error logging in:', error.message);
      notyf.error('Error logging in.');
  }
};
