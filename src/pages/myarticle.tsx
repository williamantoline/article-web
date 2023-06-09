import React, { useEffect } from "react";
import { useState } from "react";
import { css } from "../styles/styles";
import Cards from "../components/card";
import CreateDisplay from "../components/createdisplay";
import axios from "axios";
const Cookie = require("js-cookie");
const { API_ENDPOINT } = require("../config");

interface Props {};

export default function MyArticle(props: Props) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingError, setIsLoadingError] = useState(false);

    const [filterFavorite, setFilterFavorite] = useState(false);

    const onFilterChange = (e: any) => {
      setFilterFavorite(e.target.checked);
    }

    useEffect(() => {
      axios.get(API_ENDPOINT + '/api/dashboard/articles?favorite=' + filterFavorite, {
        headers: {
          'Authorization': Cookie.get('token'),
        }
      })
      .then((res) => {
        setArticles(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoadingError(true);
      })
    }, [isLoading, filterFavorite]);

    const [display, setDisplay] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);

    const handleDisplay = () => {
        setDisplay(!display);
    };
    const handleEditDisplay = () => {
      setEditDisplay(!editDisplay);
  };

    const deleteArticle = () => {
      setIsLoading(true);
      alert("deleted :)");
    };

    const afterSaved = () => {
      setIsLoading(true);
    }

    return (
        <div className={styles.body()}>
            <div className={styles.wrapper()}>
                <div className={styles.topbar()}>
                    <div className={styles.center()}>My Article</div>
                </div>
                <div className={styles.filter()}>
                  <input name="filter" id="filter" className={styles.checkbox()} type="checkbox" checked={filterFavorite} onChange={onFilterChange} />
                  <label htmlFor="filter" style={{marginLeft: 8}}>Filter favorite</label>
                </div>
                <div className={styles.row()}>
                  <div className={styles.button()}><button style={{marginLeft: "auto", width: "100px", height: "30px", backgroundColor: "#2de81c", borderRadius: 10, border: "none", color: "white"}} onClick={handleDisplay}>Add New</button></div>
                </div>
                <div className={styles.content()}>
                  {display && (
                    <CreateDisplay onSave={afterSaved} onClose={handleDisplay} message={""} />
                  )}
{/* 
                  {
                    editDisplay && <EditDisplay onClose={handleEditDisplay} message={""} articleId={""} />
                  } */}
                  {
                    isLoadingError 
                    ?
                    "Loading error. \nPlease try again later"
                    :
                    (
                      isLoading
                      ?
                      "Loading..."
                      :
                      articles.map((article: any, idx: any) => {
                        return (
                            <Cards isLiked={true} isLogged={true} title={article.title} id={article.id} component={"edit"} onDelete={deleteArticle} onEdit={handleEditDisplay}/>
                        )
                      })
                    )
                  }
                </div>
            </div>
        </div>
    );
}

const styles = {
    body: css({
      backgroundColor: "#F5F5F5",
      height: '100vh',
      display: 'flex',
      margin: '0 auto',
    }),
    row: css({
      display: "flex",
      margin: "0 auto",
    }),
    wrapper: css({
      display: "block",
      width: "100%"
    }),
    topbar: css({
      height: "10%",
      width: "100%",
      fontSize: 15,
      backgroundColor: "#F5F5F5",

      fontFamily: "sans-serif-medium",
      fontWeight: "bolder",
      padding: 25,
      display: "flex"
    }),
    center: css({
      fontSize: 34,
      fontWeight: "bolder",
      margin: "0 auto"
    }),
    button: css({
      margin: "0 auto",
      paddingRight: 70,
      width: 1200,
      display: "flex",
      justifyContent: "flex-end",
    }),
    buttonstyle: css({
      marginLeft: "auto", 
      width: "100px", 
      height: "30px", 
      backgroundColor: "#2de81c", 
      borderRadius: 10, 
      border: "none", 
      color: "white",
      "&:hover": {backgroundColor: "#148709"}
    }),
    content: css({
      maxWidth: 1200,
      width: "100%",
      height: "calc(100% - 120px)", // subtract height of topbar
      margin: "0 auto",
      padding: "15px 0",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gridGap: 20,
      "@media screen and (max-width: 768px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    },
      paddingTop: 10,
      flexWrap: "wrap",
    }),
    filter: css({
      marginLeft: 450,
    }),
    checkbox: css({
      background: "yellow",
      margin: "0 auto",
    })
  };