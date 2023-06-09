import React, { useState } from "react";
import { css } from "../styles/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Cookie = require("js-cookie");
const { API_ENDPOINT } = require("../config");

const LoginImage = require("../assets/login.jpg")
interface Props {};

export default function Login(props: Props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailOnChange = (e: any) => {
        setEmail(e.target.value);
    }
    const handlePasswordOnChange = (e: any) => {
        setPassword(e.target.value);
    }


    const handleLoginButtonClick = () => {
        axios.post(API_ENDPOINT + '/api/auth/login', {
            email: email,
            password: password,
        })
        .then((res: any) => {
            alert('berhasil login');
            Cookie.set('token', res.data.token);
            navigate('/');
        })
        .catch((err: any) => {
            // alert(err.response.data.message);
            alert(err)
            setPassword('');
        });
    }

    return (
        <div className={styles.body()}>
            <div className={styles.container()}>
                <div className={styles.left()}>
                    <img src={LoginImage} style={{width: "100%", height: "100%",borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} alt="" />
                </div>
                <div className={styles.right()}>
                    <div className={styles.title()}>Login</div>
                    <div className={styles.textbox()}>
                        <label className={styles.inputtext()} htmlFor="Email">Email</label>
                        <div className={styles.inputtextbox()}><input style={{ width: "100%", height: 39, outline: "none", borderRadius: 4, border: "none"}} type="text" id="Email" value={email} onChange={handleEmailOnChange} /></div>
                        <label className={styles.inputtext()} htmlFor="Password">Password</label>
                        <div className={styles.inputtextbox()}><input style={{ width: "100%", height: 39, outline: "none", borderRadius: 4, border: "none"}} type="password" id="Password" value={password} onChange={handlePasswordOnChange} /></div>
                        <button className={styles.loginbutton()} onClick={handleLoginButtonClick}>Log In</button>
                        <div className={styles.signuptext()}>
                            Don't have an account? <a href="/register" className={styles.href()}>Sign Up</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

const styles = {
    body: css({
        height: "100vh",
        backgroundColor: "#F0EFEF",
        fontFamily: "Helvetica"
    }),
    container: css({
        height: "80%",
        width: "50%",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        borderRadius: 25
    }),
    left: css({
        width: "45.1%",
        height: "100%",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    }),
    right: css({
        width: "54.9%",
        height: "100%",
        color: "white",
        backgroundColor: "#292727",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    }),
    title: css({
        fontSize: 48,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginTop: 100
    }),
    textbox: css({
        display: "block",
        width: "80%",
        margin: "0 auto",
        marginTop: 40,
    }),
    inputtext: css({
        margin: 5,
        fontSize: 20,
    }),
    inputtextbox: css({
        margin: 5,
        marginBottom: 25
    }),
    loginbutton: css({
        width: "97%",
        fontSize: 16,
        height: 39, 
        outline: "none", 
        borderRadius: 4, 
        border: "none",
        margin: 5,
        marginTop: 30,
        backgroundColor: "#A09D9D",
        color: "#fefefe",
        "&:hover": {backgroundColor: "#726E6E"}
    }),
    signuptext: css({
        fontSize: 14,
        margin: "0 auto",
        textAlign: "center",
        marginTop: 120,
    }),
    href: css({
        color: "white",
        "&:hover": {
            textShadow: "none",
            color: "#d3d0cf"
        },
    })
}