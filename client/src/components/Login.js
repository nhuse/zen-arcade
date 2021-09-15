import { useState } from "react"
import { useHistory } from "react-router-dom"
import './styles/RegisterLoginStyles.css'

export default function Login({ setUser }) {
    const history = useHistory()

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    function handleChange(event) {
        setLoginInfo({ ...loginInfo,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error) {
                alert(data.error)
            } else {
                setUser(data)
                history.push("/home")
            }
        })
    }

    return (
        <div className="login-signup-form-wrapper">
            <form className="login-signup-form" onSubmit={handleSubmit}>
                <br/>
                <label htmlFor="email">Email:</label><br/>
                <input type="text" name="email" className="input-field" id="email" value={loginInfo.email} onChange={handleChange} /><br/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" className="input-field" id="password" value={loginInfo.password} onChange={handleChange} /><br/><br/>
                <button type="submit" style={{ borderRadius: "30px" }}>Submit</button>
            </form>
        </div>
    )
}