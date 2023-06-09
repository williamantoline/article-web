import React from "react";
import { useState } from "react";
import { css } from "../styles/styles";
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { API_ENDPOINT } = require("../config");
const Cookie = require("js-cookie");

interface Props {
    title: string,
    id: string,
    component?: string,
    onEdit: () => void;
    onDelete: () => void;
    isLogged: boolean,
    isLiked: boolean,
    // color?: string,
    // onClick: (e: any) => void,
};

Cards.defaultProps = {
    component: '',
    onEdit: () => {},
    onDelete: () => {},
  }
    

export default function Cards(props: Props){
    console.log(props);
    const navigate = useNavigate();

    const [liked, setLiked] = useState(props.isLiked);
  
    const handleClick = () => {
        if (!props.isLogged) {
            navigate('/login');
        } else {
            axios.patch(API_ENDPOINT + '/api/articles/like/' + props.id, {
                isLiked: !liked,
            }, {
                headers: {
                    'Authorization': Cookie.get('token'),
                }
            })
            .then((res) => {

            })
            .catch((err) => {
                alert("Internal server error");
            })
            setLiked(!liked);
        }
    };

    const deleteArticle = () => {
        axios.delete(API_ENDPOINT + '/api/dashboard/articles/' + props.id, {
            headers: {
                'Authorization': Cookie.get('token'),
            }
        })
        .then((res) => {

        })
        .catch((err) => {
            console.log(err);
            alert("Internal server error");
        })
        props.onDelete();
    }



    const renderComponent = () => {
        switch(props.component) {
            case 'edit':
                return (
                    <div>
                        {/* <span onClick={props.onEdit}>
                            <FaEdit color="gray" size={25} style={{margin: "0 5"}} />
                        </span> */}
                        <span onClick={deleteArticle}>
                            <FaTrash color="gray" size={25} style={{margin: "0 5"}} />
                        </span>
                    </div>
                    
                );
            default:
                return (
                    <span onClick={handleClick}>
                        {liked ? (
                            <FaHeart color="red" size={25} style={{margin: "0 5"}} />
                        ) : (
                            <FaRegHeart color="gray" size={25} style={{margin: "0 5"}} />
                        )}
                    </span>
                );
        }
    };

    return(
        <div className={styles.card()}>
            <a href={"/articles/" + props.id} style={{ color: 'black', textDecoration: 'none' }}>
                <div className={styles.topcard()}>{props.title}</div>
            </a>
            <div className={styles.bottomcard()}>
                <div className={styles.component()}>
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}

const styles = {
    card: css({
        display: "block",
        width: "250px",
        height: "250px",
        margin: 20,
        borderRadius: 15,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)"
        }
      }),      
    topcard: css({
        padding: 20,
        width: "250px",
        height: "200px",
        margin: "auto",
        textAlign: "center",
        backgroundColor: "#e0dede",
        borderRadius: 15,
        fontWeight: 600,
        fontSize: 20,
        color: "#333",
        display: "flex",
        alignItems: "center",
    justifyContent: "center",
        fontFamily: "Arial, sans-serif"
    }),
    bottomcard: css({
        height: "40px",
        marginTop: "5px",
    }),
    component: css({
        marginLeft: "auto",
        marginRight: "10px",
        marginTop: "5px",
        textAlign: "right",
        "& svg": {
            verticalAlign: "middle"
        },
    
    }),
}