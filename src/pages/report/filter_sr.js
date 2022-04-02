import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { SCheckbox, SLabel } from "../../Shared/index";
import { makeStyles } from "@material-ui/core/styles";
import LoadTable from "./load_table";
import ShoppingCart from "./ShoppingCart";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import Helper from "../../Shared/helpers";
function FilterSpecialRemarks() {
    const function_div = {

        padding: "5px",
        marginTop: "10px",
        marginBottom: "2px",
        marginLeft: "2px",
        marginRight: "2px"
    }

    const initialState = {
        SpecialRemarksOOC: 0,
        SpecialRemarksNTC: 0,
        SpecialRemarksOnlyPost: 0,
        SpecialRemarksVistor: 0,
        SpecialRemarksEmail: 0,
    };
    const [{ SpecialRemarksOOC, SpecialRemarksNTC, SpecialRemarksOnlyPost, SpecialRemarksVistor, SpecialRemarksEmail }, setState] = useState(initialState);
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
        if (SpecialRemarksOOC) {
            queryFilter = queryFilter + " and sr_ooc=1"
        }
        if (SpecialRemarksNTC) {
            queryFilter = queryFilter + " and sr_ntc=1"
        }
        if (SpecialRemarksOnlyPost) {
            queryFilter = queryFilter + " and sr_post=1"
        }
        if (SpecialRemarksVistor) {
            queryFilter = queryFilter + " and sr_visitor=1"
        }
        if (SpecialRemarksEmail) {
            queryFilter = queryFilter + " and sr_email=1"
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
            <SCheckbox name="SpecialRemarksOOC" onChange={onChange} checked={SpecialRemarksOOC} displayName="OOC" />
            <SCheckbox name="SpecialRemarksNTC" onChange={onChange} checked={SpecialRemarksNTC} displayName="NTC" />
            <SCheckbox name="SpecialRemarksOnlyPost" onChange={onChange} checked={SpecialRemarksOnlyPost} displayName="Only Post" />
            <SCheckbox name="SpecialRemarksVistor" onChange={onChange} checked={SpecialRemarksVistor} displayName="Visitor" />
            <SCheckbox name="SpecialRemarksEmail" onChange={onChange} checked={SpecialRemarksEmail} displayName="Email" />
            <button className="col-md-2 btn btn-success" onClick={fetchData}>Support Search</button>
        </div>
        <LoadTable rowData={rows} />
    </Typography>;
}
export default FilterSpecialRemarks;
