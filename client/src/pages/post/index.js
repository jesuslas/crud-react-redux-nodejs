import React from "react";
import ItemContainer from "../../components/crud/";
const Post = () => (
    <ItemContainer
      {...{
        LABEL: "Post",
        TITLEDEL: "post",
        MODEL: "post",
        ROWS: [
          { col: "Id", schema: "id" },
          { col: "Nombre", schema: "name", edit: true, type: "text" },
          { col: "Descripción", schema: "description", edit: true, type: "text" }
        ],
        SEARCH: [
          {
            schema: "name",
            label: "Nombre"
          }
        ],
        CUSTOMPROCESSDATA: data => {
          if (!data) {
            return [];
          }
          return data.map(d => {
            return {
              ...d
            };
          });
        }
      }}
    />
);
export default Post;