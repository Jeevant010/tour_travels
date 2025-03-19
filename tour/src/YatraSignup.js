import React from 'react';

function YatraSignup() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {}
        <img
          src="https://img.freepik.com/free-vector/flat-vintage-travel-background_23-2148189177.jpg?t=st=1742134012~exp=1742137612~hmac=06376dfcf004c42d38002af51ca87e3d3de4679edba27cfbd625c0cc25ee6797&w=826" 
          alt="Thumbnail"
          style={styles.thumbnail}
        />
      
        <p style={styles.welcomeText}>Welcome to Yatra.com</p>
      </div>
      <div style={styles.formContainer}>
        <button style={styles.googleButton}>Continue With Google</button>
        <form style={styles.form}>
          <input type="text" placeholder="Name" style={styles.input} />
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="tel" placeholder="Phone No." style={styles.input} />
          <input type="text" placeholder="Address" style={styles.input} />
          <label style={styles.rememberMe}>
            <input type="checkbox" /> Remember Me
          </label>
          <button type="submit" style={styles.registerButton}>Register</button>
        </form>
        <p style={styles.loginText}>Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: 'url(https://img.freepik.com/free-vector/realistic-travel-background-with-elements_52683-77784.jpg?t=st=1742133516~exp=1742137116~hmac=a8aa02dba2459dfdd9e77f56365c83fb5b4df4692be45e3c8a60229325afccbf&w=996)',
    backgroundSize: 'cover',
    backgroundPosition: 'left top',
    fontFamily: 'Arial, sans-serif',
    color: '#fff', 
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  thumbnail: {
    width: '100px',
    height: '100px',
    borderRadius: '50%', 
    marginBottom: '10px',
  },
  welcomeText: {
    color: '#000', 
  },
  formContainer: {
    width: '300px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: '10px',
  },
  googleButton: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  rememberMe: {
    marginBottom: '10px',
    color: '#000',
  },
  registerButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loginText: {
    marginTop: '10px',
    color: '#000', 
  },
};

export default YatraSignup;