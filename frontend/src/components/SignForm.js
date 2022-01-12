import React from 'react';

function SignForm(props) {

    const [data, setData] = React.useState ({
        password: '',
        email: '',
      })
      
  
    function handleChange(e) {
      const {name, value} = e.target;
      setData ({
        ...data,
        [name]: value
      });
    }
    
    function handleSubmit(e) {
      e.preventDefault();
        props.enter(data);
       
      } 
    

    return(
        <form className="form form-sign" name={props.name} onSubmit={handleSubmit}>
                <h2 className="form__title">{props.title}</h2>
                <input className="form__input form__input_type_email" id="place-input" type="email" name="email" placeholder="email" required minLength="2" maxLength="30" value={data.email} onChange={handleChange} />
                <input className="form__input form__input_type_password" id="link-input" type="password" name="password" placeholder="Пароль" required value={data.password} onChange={handleChange}/>
                <button className="form__sign-button">{props.buttonText}</button>
        </form>
    )
}
export default SignForm;