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
function FilterDonor() {
  const function_div = {

    padding: "5px",
    marginTop: "10px",
    marginBottom: "2px",
    marginLeft: "2px",
    marginRight: "2px"
  }

  const initialState = {
    DonorAnnual: 0,
    DonorFD: 0,
    DonorThings: 0,
    DonorWelfare: 0,
    SupportCS: 0,
    SupportFS: 0,
    SupportBS: 0,
    SupportCloth: 0,
    SupportOthers: 0,
    SpecialRemarksOOC: 0,
    SpecialRemarksNTC: 0,
    SpecialRemarksOnlyPost: 0,
    SpecialRemarksVistor: 0,
    SpecialRemarksEmail: 0,
  };
  const [{ DonorAnnual, DonorFD, DonorThings, DonorWelfare, SupportCS, SupportFS, SupportBS, SupportCloth, SupportOthers, SpecialRemarksOOC, SpecialRemarksNTC, SpecialRemarksOnlyPost, SpecialRemarksVistor, SpecialRemarksEmail }, setState] = useState(initialState);
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
    //fetchData();
  }, []);
  function fetchData() {
    let queryFilter = "";
    if (DonorAnnual) {
      queryFilter = queryFilter + " and donor_annual=1"
    }
    if (DonorFD) {
      queryFilter = queryFilter + " and donor_fd=1"
    }
    if (DonorThings) {
      queryFilter = queryFilter + " and donor_things=1"
    }
    if (DonorWelfare) {
      queryFilter = queryFilter + " and donor_welfare=1"
    }
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
      <SCheckbox name="DonorAnnual" onChange={onChange} checked={DonorAnnual} displayName="Annual" />
      <SCheckbox name="DonorFD" onChange={onChange} checked={DonorFD} displayName="FD" />
      <SCheckbox name="DonorThings" onChange={onChange} checked={DonorThings} displayName="Things" />
      <SCheckbox name="DonorWelfare" onChange={onChange} checked={DonorWelfare} displayName="Welfare" />
      <div className="col-md-2"></div>
    </div>
    <div className="row" style={function_div}>
      <SCheckbox displayName="CS" name="SupportBS" onChange={onChange} checked={SupportCS} />
      <SCheckbox displayName="FS" name="SupportFS" onChange={onChange} checked={SupportFS} />
      <SCheckbox displayName="BS" name="SupportBS" onChange={onChange} checked={SupportBS} />
      <SCheckbox displayName="Cloth Support" name="SupportCloth" onChange={onChange} checked={SupportCloth} />
      <SCheckbox displayName="Others" name="SupportOthers" onChange={onChange} checked={SupportOthers} />
    </div>
    <div className="row" style={function_div}>
      <SCheckbox name="SpecialRemarksOOC" onChange={onChange} checked={SpecialRemarksOOC} displayName="OOC" />
      <SCheckbox name="SpecialRemarksNTC" onChange={onChange} checked={SpecialRemarksNTC} displayName="NTC" />
      <SCheckbox name="SpecialRemarksOnlyPost" onChange={onChange} checked={SpecialRemarksOnlyPost} displayName="Only Post" />
      <SCheckbox name="SpecialRemarksVistor" onChange={onChange} checked={SpecialRemarksVistor} displayName="Visitor" />
      <SCheckbox name="SpecialRemarksEmail" onChange={onChange} checked={SpecialRemarksEmail} displayName="Email" />
      <button className="col-md-2 btn btn-success" onClick={fetchData}>Search</button>
    </div>
    <LoadTable rowData={rows} />
  </Typography>;
}
export default FilterDonor;
