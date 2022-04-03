import React, { useState, useEffect } from "react";
import { SCheckbox, SDate, SLabel, STextBox, STextBoxSix,STextBoxNine } from "../Shared/index";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
//import * as moment from "moment";
import axios from "axios";
const border = {
    border: "2px solid #73AD21",
    borderRadius: "5px",
    padding: "4px",
    marginBottom: "4px",
    marginLeft: "10px",
    marginRight: "10px"
}

function DonorRegistration() {

    const initialState = {
        DonorName: "",
        AddressLine1: "",
        AddressLine2: "",
        CountryId: "",
        StateId: "",
        CityId: "",
        PhoneNo1: "",
        PhoneNo2: "",
        LandLineNo1: "",
        LandLineNo2: "",
        FileName: "",
        EmailId1: "",
        EmailId2: "",
        Reference: "",
        RelatedFiles: "",
        DonorAnnual: 0,
        DonorFD: 0,
        DonorThings: 0,
        DonorWelfare: 0,
        SupportCS: "",
        SupportFS: "",
        SupportBS: "",
        SupportCloth: "",
        SupportOthers: "",
        SpecialRemarksOOC: "",
        SpecialRemarksNTC: "",
        SpecialRemarksOnlyPost: "",
        SpecialRemarksVistor: "",
        SpecialRemarksEmail: "",
        ImportantDate1: "",
        ImportantDate2: "",
        ImportantDate3: "",
        ImportantDate4: "",
        ImportantDate5: ""
    };


    useEffect(() => {
        handleFetchDonorDetails();
        let isSaveEdiMode = localStorage.getItem("isSaveEdiMode")
        if (isSaveEdiMode == "edit") {
            handleFetchDonorDetails();
        }
    }, [initialState]);
    const fetchData = [];
    const handleFetchDonorDetails = () => {
        axios.get("http://localhost:81/lukes_donor/select.php")
            .then((result) => {
                if (result.data) {
                    fetchData = result.data[0];
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [{ DonorName, AddressLine1, AddressLine2, CountryId, StateId, CityId,
        PhoneNo1,PhoneNo2,LandLineNo1,LandLineNo2,FileName, EmailId1,EmailId2, Reference, RelatedFiles,
        DonorAnnual, DonorFD, DonorThings, DonorWelfare,
        SupportCS, SupportFS, SupportBS, SupportCloth, SupportOthers,
        SpecialRemarksOOC, SpecialRemarksNTC, SpecialRemarksOnlyPost, SpecialRemarksVistor, SpecialRemarksEmail,
        ImportantDate1, ImportantDate2, ImportantDate3, ImportantDate4, ImportantDate5 }, setState] = useState(initialState);
    const [OptionState, setOptionsState] = useState(new Map());
    const [StateOptionCode, SetStateOptionCode] = useState("");
    const [ModalBodyMessage, SetModalBodyMessage] = useState(false);
    const [ModalHeadingColor, SetModalHeadingColor] = useState(false);
    const [ModalShowAlert, SetModalShowAlert] = useState(false);

    const clearState = () => {
        setState({ ...initialState });
    };

    const onChange = e => {
        const { name, value } = e.target;
        if (e.target.type === 'checkbox' && !e.target.checked) {
            setState(prevState => ({ ...prevState, [name]: '' }));
        } else {
            setState(prevState => ({ ...prevState, [name]: value }));
        }

    };

    const handleSubmit = e => {
        e.preventDefault();
        handleSaveDonor();
    };

    const handleSaveDonor = () => {
        var bodyFormData = new FormData();
        bodyFormData.append('donor_name', DonorName);
        bodyFormData.append('address_line1', AddressLine1);
        bodyFormData.append('address_line2', AddressLine2);
        bodyFormData.append('phone_no1', PhoneNo1);
        bodyFormData.append('phone_no2', PhoneNo2);
        bodyFormData.append('landline_no1', LandLineNo1);
        bodyFormData.append('landline_no2', LandLineNo2);
        bodyFormData.append('donor_file_name', FileName);
        bodyFormData.append('email_id1', EmailId1);
        bodyFormData.append('email_id2', EmailId2);
        bodyFormData.append('reference', Reference);
        bodyFormData.append('related_files', RelatedFiles);
        bodyFormData.append('donor_annual', DonorAnnual == "on" ? 1 : 0,);
        bodyFormData.append('donor_fd', DonorFD == "on" ? 1 : 0,);
        bodyFormData.append('donor_things', DonorThings == "on" ? 1 : 0,);
        bodyFormData.append('donor_welfare', DonorWelfare == "on" ? 1 : 0,);

        bodyFormData.append('support_cs', SupportCS == "on" ? 1 : 0,);
        bodyFormData.append('support_fs', SupportFS == "on" ? 1 : 0,);
        bodyFormData.append('support_bs', SupportBS == "on" ? 1 : 0,);
        bodyFormData.append('support_cloth', SupportCloth == "on" ? 1 : 0,);
        bodyFormData.append('support_other', SupportOthers == "on" ? 1 : 0,);

        
        bodyFormData.append('sr_ooc', SpecialRemarksOOC == "on" ? 1 : 0,);
        bodyFormData.append('sr_ntc', SpecialRemarksNTC == "on" ? 1 : 0,);
        bodyFormData.append('sr_post', SpecialRemarksOnlyPost == "on" ? 1 : 0,);
        bodyFormData.append('sr_visitor', SpecialRemarksVistor == "on" ? 1 : 0,);
        bodyFormData.append('sr_email', SpecialRemarksEmail == "on" ? 1 : 0,);

        axios({
            method: "post",
            url: "http://localhost:81/lukes_donor/insert.php",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                SetModalBodyMessage(response.data.msg);
                SetModalHeadingColor("lightgreen");
                SetModalShowAlert(true);
                clearState();
            })
            .catch(function (response) {
                SetModalBodyMessage(response.msg);
                SetModalHeadingColor("red");
                SetModalShowAlert(true);
            });
    };
    return (
        <div >
            <form onSubmit={handleSubmit}>
                <hr />
                <div className="row" style={{padding:"5px"}}>
                    <STextBox displayName="Name" required name="DonorName" value={DonorName} onChange={onChange} />
                    <STextBox displayName="Address Line 1" required name="AddressLine1" value={AddressLine1} onChange={onChange} />
                    <STextBox displayName="Address Line 2" required name="AddressLine2" value={AddressLine2} onChange={onChange} />
                    <div className="col-md-3">
                        <label style={{ fontSize: "18px" }}>Country</label>
                        <select className="form-control"
                            value={StateOptionCode}
                            onChange={(e) => SetStateOptionCode(e.target.value)}>
                            <option value="">Select</option>
                            <option value="1">India</option>
                            <option value="2">UnitedStates</option>
                        </select>
                    </div>
                    <STextBox displayName="Phone No1" required name="PhoneNo1" value={PhoneNo1} onChange={onChange} />
                    <STextBox displayName="Phone No2" required name="PhoneNo2" value={PhoneNo2} onChange={onChange} />
                    <STextBox displayName="LandLine No1" required name="LandLineNo1" value={LandLineNo1} onChange={onChange} />
                    <STextBox displayName="LandLine No2" required name="LandLineNo2" value={LandLineNo2} onChange={onChange} />
                    <STextBox displayName="File Name" name="FileName" value={FileName} onChange={onChange} />
                    <STextBox displayName="Email Id1" name="EmailId1" value={EmailId1} onChange={onChange} />
                    <STextBox displayName="Email Id2" name="EmailId2" value={EmailId2} onChange={onChange} />
                    <STextBox displayName="Reference" name="Reference" value={Reference} onChange={onChange} />
                    <STextBoxSix displayName="Related Files" name="RelatedFiles" value={RelatedFiles} onChange={onChange} />
                </div>
                <br />
                <div className="row" style={border}>
                    <SLabel displayName="Donor:" />
                    <SCheckbox name="DonorAnnual" onChange={onChange} checked={DonorAnnual} displayName="Annual" />
                    <SCheckbox name="DonorFD" onChange={onChange} checked={DonorFD} displayName="FD" />
                    <SCheckbox name="DonorThings" onChange={onChange} checked={DonorThings} displayName="Things" />
                    <SCheckbox name="DonorWelfare" onChange={onChange} checked={DonorWelfare} displayName="Welfare" />
                </div>
                <div className="row" style={border}>
                    <SLabel displayName="Support:" />
                    <SCheckbox displayName="CS" />
                    <SCheckbox displayName="FS" />
                    <SCheckbox displayName="BS" />
                    <SCheckbox displayName="Cloth Support" />
                    <SCheckbox displayName="Others" />
                </div>
                <div className="row" style={border}>
                    <SLabel displayName="Special Remarks:" />
                    <SCheckbox displayName="OOC" />
                    <SCheckbox displayName="NTC" />
                    <SCheckbox displayName="Only Post" />
                    <SCheckbox displayName="Visitor" />
                    <SCheckbox displayName="Email" />
                </div>

                <SLabel displayName="Important Dates" />
                <div style={border}>
                    <div className="row">
                        <SDate displayName="Date 1:" />
                        <STextBoxNine displayName="Date 1 Remarks" />
                    </div>
                    <div className="row">
                        <SDate displayName=" Date 2:" />
                        <STextBoxNine displayName="Date 2 Remarks" />
                    </div>
                    <div className="row">
                        <SDate displayName="Date 3:" />
                        <STextBoxNine displayName="Date 3 Remarks" />
                    </div>
                    <div className="row">
                        <SDate displayName="Date 4:" />
                        <STextBoxNine displayName="Date 4 Remarks" />
                    </div>
                    <div className="row">
                        <SDate displayName="Date 5:" />
                        <STextBoxNine displayName="Date 5 Remarks" />
                    </div>
                </div>
                <div className="form-row" >
                   
                    <div className="col-md-2 pullRight">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>

            </form>
            <Modal
                size="lg"
                show={ModalShowAlert}
                aria-labelledby="example-modal-sizes-title-lg"
                backdrop={true}
                centered
            >
                <Modal.Header style={{ backgroundColor: ModalHeadingColor }} >
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {ModalBodyMessage}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => SetModalShowAlert(false)}>CLOSE</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DonorRegistration;