import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { SCheckbox } from "../../Shared/index";
import { makeStyles } from "@material-ui/core/styles";
import LoadTable from "./load_table";
import axios from "axios";
import Helper from "../../Shared/helpers";
function FilterSupport() {
    const function_div = {

        padding: "5px",
        marginTop: "10px",
        marginBottom: "2px",
        marginLeft: "2px",
        marginRight: "2px"
    }

    const initialState = {
        SupportCS: 0,
        SupportFS: 0,
        SupportBS: 0,
        SupportCloth: 0,
        SupportOthers: 0
    };
    const [{ SupportCS, SupportFS, SupportBS, SupportCloth, SupportOthers }, setState] = useState(initialState);
    const onChange = e => {
        const { name, value } = e.target;
        if (e.target.type === 'checkbox' && !e.target.checked) {

            setState(prevState => ({ ...prevState, [name]: '' }));
        } else {
            setState(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const useStyles = makeStyles({
        table: {
            minWidth: 650
        }
    });

    const originalRows = []

    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");
    const [QueryString, setQueryString] = useState("");
    const classes = useStyles();

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    useEffect(() => {
        fetchData();
    }, []);
    function fetchData() {
        let queryFilter = "";
        if (SupportBS) {
            queryFilter = queryFilter + " and support_bs=1"
        }
        if (SupportCS) {
            queryFilter = queryFilter + " and support_cs=1"
        }
        if (SupportCloth) {
            queryFilter = queryFilter + " and support_cloth=1"
        }
        if (SupportFS) {
            queryFilter = queryFilter + " and support_fs=1"
        }
        if (SupportOthers) {
            queryFilter = queryFilter + " and support_other=1"
        }
        const GetQuery = Helper.getUrl() + "select_filter.php?query=" + queryFilter;
        axios
            .get(GetQuery)
            .then((result) => {
                const data = result.data;
                setRows(data);
                console.log("res" + result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return <Typography>
        <div className="row" style={function_div}>
            <SCheckbox displayName="CS"  name ="SupportBS" onChange={onChange} checked={SupportCS}/>
            <SCheckbox displayName="FS"  name ="SupportFS"onChange={onChange} checked={SupportFS}/>
            <SCheckbox displayName="BS"  name ="SupportBS" onChange={onChange} checked={SupportBS}/>
            <SCheckbox displayName="Cloth Support"  name ="SupportCloth" onChange={onChange} checked={SupportCloth}/>
            <SCheckbox displayName="Others" name ="SupportOthers" onChange={onChange} checked={SupportOthers}/>  
            <button className="col-md-2 btn btn-success" onClick={fetchData}>Support Search</button>
        </div>
        <LoadTable rowData={rows} />
    </Typography>;
}
export default FilterSupport;
