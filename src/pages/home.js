import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Helper from "../Shared/helpers";
import axios from "axios";
function About() {
  const [TotalCount, setTotalCount] = useState("");
  const [DonorAnnualCount, setDonorAnnualCount] = useState("");
  const [DonorFDCount, setDonorFDCount] = useState("");
  const [DonorThingsCount, setDonorThingsCount] = useState("");
  const [DonorWelfareCount, setDonorWelfareCount] = useState("");
  const [SupportCSCount, setSupportCSCount] = useState("");
  const [SupportFSCount, setSupportFSCount] = useState("");
  const [SupportBSCount, setSupportBSCount] = useState("");
  const [SupportClothCount, setSupportClothCount] = useState("");
  const [SupportOtherCount, setSupportOtherCount] = useState("");
  const [SROOCCount, setSROOCCount] = useState("");
  const [SRNTCCount, setSRNTCCount] = useState("");
  const [SRPostCount, setSRPostCount] = useState("");
  const [SRVisitorCount, setSRVisitorCount] = useState("");
  const [SREmailCount, setSREmailCount] = useState("");
  useEffect(() => {
    FetchCount();
  }, []);
  const FetchCount = () => {
    const GetQuery = Helper.getUrl() + "select_count.php";
    axios
      .get(GetQuery)
      .then((result) => {
        setTotalCount(result.data[0].TotalCount);
        setDonorAnnualCount(result.data[0].DonorAnnualCount);
        setDonorFDCount(result.data[0].DonorFDCount);
        setDonorThingsCount(result.data[0].DonorThingsCount);
        setDonorWelfareCount(result.data[0].DonorWelfareCount);
        setSupportCSCount(result.data[0].SupportCSCount);
        setSupportFSCount(result.data[0].SupportFSCount);
        setSupportBSCount(result.data[0].SupportBSCount);
        setSupportClothCount(result.data[0].SupportClothCount);
        setSupportOtherCount(result.data[0].SupportOtherCount);
        setSROOCCount(result.data[0].SROOCCount);
        setSRNTCCount(result.data[0].SRNTCCount);
        setSRPostCount(result.data[0].SRPostCount);
        setSRVisitorCount(result.data[0].SRVisitorCount);
        setSREmailCount(result.data[0].SREmailCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return <div className="row container" style={{ paddingTop: "40px" }}>

    <div className="col-md-4">

      <table className="table table-bordered">
        <thead>
          <tr>
            <td>
              Total Registration
            </td>
            <td>
              {TotalCount}
            </td>
          </tr>
          <tr>
            <td>
              DonorAnnual
            </td>
            <td>
              {DonorAnnualCount}
            </td>
          </tr>
          <tr>
            <td>
              DonorFD
            </td>
            <td>
              {DonorFDCount}
            </td>
          </tr>
          <tr>
            <td>
              DonorThings
            </td>
            <td>
              {DonorThingsCount}
            </td>
          </tr>
          <tr>
            <td>
              DonorWelfare
            </td>
            <td>
              {DonorWelfareCount}
            </td>
          </tr>
        </thead>
      </table>
    </div>
    <div className="col-md-4">
      <table className="table table-bordered">
        <thead>
          <tr><td>SupportCS</td><td>{SupportCSCount}</td> </tr>
          <tr><td>SupportFS</td><td>{SupportFSCount}</td></tr>
          <tr><td>SupportBS</td><td>{SupportBSCount}</td></tr>
          <tr><td>SupportCloth</td><td>{SupportClothCount}</td></tr>
          <tr><td>SupportOther</td><td>{SupportOtherCount}</td>
          </tr>
        </thead>
      </table>
    </div>
    <div className="col-md-4">
      <table className="table table-bordered">
        <thead>
          <tr><td>Special Remarks OOC</td><td>{SROOCCount}</td> </tr>
          <tr><td>Special Remarks NTC</td><td>{SRNTCCount}</td></tr>
          <tr><td>Special Remarks Post</td><td>{SRPostCount}</td></tr>
          <tr><td>Special Remarks Visitor</td><td>{SRVisitorCount}</td></tr>
          <tr><td>Special Remarks Email</td><td>{SREmailCount}</td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
}
export default About;