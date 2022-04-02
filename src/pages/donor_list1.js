import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import Helper from "../Shared/helpers";


const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

const originalRows = []

export default function DonorList() {
    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");
    const classes = useStyles();

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row.DonorName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    useEffect(() => {
        fetchDonorList();
    }, []);

    const fetchDonorList = () => {
        axios
            .get(
                Helper.getUrl() + "select.php"
            )
            .then((result) => {
                const data = result.data;
                setRows(data);
                console.log("res" + result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <>
            <Paper>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
                <TableContainer>
                <div class="table-responsive text-nowrap">
                <table className="table table-bordered">
                     <tr>
                                <td width="10%"  align="left">Donor Name</td>
                                <td width="10%"  align="left">Address</td>
                                <td width="10%" align="left">Phone No1</td>
                                <td width="10%" align="left">Phone No2</td>
                                <td width="10%" align="left">LandLineNo1</td>
                                <td width="10%" align="left">LandLineNo2</td>
                                <td align="left">File Name</td>
                                <td align="left">Reference</td>
                                <td align="left">Related Files</td>
                                <td align="left">EmailId1</td>
                                <td align="left">EmailId2</td>
                                <td align="left">Annual</td>
                                <td align="left">FD</td>
                                <td align="left">Things</td>
                                <td align="left">Welfare</td>
                                <td align="left">CS</td>
                                <td align="left">FS</td>
                                <td align="left">BS</td>
                                <td align="left">Cloth</td>
                                <td align="left">Others</td>
                                <td align="left">OOC</td>
                                <td align="left">NTC</td>
                                <td align="left">Post</td>
                                <td align="left">Visitor</td>
                                <td align="left">Email</td>
                            </tr>
                      
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.DonorName}>
                                    <td align="left">{row.DonorName}</td>
                                    <td align="left">{row.AddressLine1} {row.AddressLine2}</td>
                                    <td align="left">{row.PhoneNo1}</td>
                                    <td align="left">{row.PhoneNo2}</td>
                                    <td align="left">{row.LandLineNo1}</td>
                                    <td align="left">{row.LandLineNo2}</td>
                                    <td align="left">{row.FileName}</td>
                                    <td align="left">{row.Reference}</td>
                                    <td align="left">{row.RelatedFiles}</td>
                                    <td align="left">{row.EmailId1}</td>
                                    <td align="left">{row.EmailId2}</td>
                                    <td align="left">{row.donor_annual == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.donor_fd == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.donor_things == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.donor_welfare == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.support_cs == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.support_fs == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.support_bs == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.support_cloth == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.support_other == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.sr_ooc == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.sr_ntc == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.sr_post == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.sr_visitor == 1 ? "Yes" : "No"}</td>
                                    <td align="left">{row.sr_email == 1 ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </TableContainer>
            </Paper>
        </>
    );
}
