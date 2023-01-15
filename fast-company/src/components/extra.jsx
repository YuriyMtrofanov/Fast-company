import React, { useState, useEffect } from "react";
import api from "../api";

export const Extra = () => {
    // const [dataList, setDataList] = useState();

    useEffect(() => {
            console.log(api.users.altFetchAll());
    }, []);
};
