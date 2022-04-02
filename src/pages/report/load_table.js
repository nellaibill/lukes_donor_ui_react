import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
function LoadTable(props) {
    const useStyles = makeStyles({
        table: {
            minWidth: 650
        }
    });
    const originalRows = [];
    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");
    const classes = useStyles();
    //originalRows = props.rows.length > 0 ?? props.rows;
    //setRows(props.rows)
    //originalRows = props? props.rowData : [];
    if (props !== undefined) {
        if (props.rowData !== undefined) {

            let data = props.rowData;
            console.log(data);
            //setRows(data);
        }
    }
    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row.DonorName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return <Typography>
        <hr />
        <Paper>

            <div class="table-responsive text-nowrap">
                <table className="table table-bordered">
                    <tr>
                        <td width="10%" align="left">Donor Name</td>
                        <td width="10%" align="left">Address</td>
                        <td width="10%" align="left">Phone No</td>
                        <td align="left">File Name</td>
                        <td align="left">Reference</td>
                        <td align="left">Related Files</td>
                        <td align="left">EmailId</td>
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
                        {props.rowData.map((row) => (
                            <tr key={row.DonorName}>
                                <td align="left">{row.DonorName}</td>
                                <td align="left">{row.AddressLine1} {row.AddressLine2}</td>
                                <td align="left">{row.PhoneNo}</td>
                                <td align="left">{row.FileName}</td>
                                <td align="left">{row.Reference}</td>
                                <td align="left">{row.RelatedFiles}</td>
                                <td align="left">{row.EmailId}</td>
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
        </Paper>
    </Typography>;
}
export default LoadTable;


