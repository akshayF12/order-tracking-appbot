import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "./redux/services/Userservice";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";
import FormPhoneComponent from "./redux/PhoneValidation";

function Settings() {
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.usersData);

  const websiteurlText =
    "https://" + new URL(location).searchParams.get("shop");
  const [primarycolor, setprimarycolor] = useState(shopInfo.primaryColor);
  const [secondarycolor, setsecondarycolor] = useState(shopInfo.secondaryColor);
  const [backgroundcolor, setbackgroundcolor] = useState(
    shopInfo.backgroundColor
  );
  const [tertiarycolor, settertiarycolor] = useState(shopInfo.tertiaryColor);
  const [rewardcolor, setrewardcolor] = useState(shopInfo.rewardpointColor);
  const [positionwigets, setpositionwigets] = useState(shopInfo.widgetposition);
  const [websiteurl, setwebsiteurl] = useState(websiteurlText);
  const [phonevalidationError, setphonevalidationError] = useState(true);
  const [clientName, setclientName] = useState(shopInfo.clientName);
  const [status, setstatus] = useState(shopInfo.status);
  const [phoneNumber, setphoneNumber] = useState(shopInfo.phoneNumber);
  const [widgetsbuttontext, setwidgetsbuttontext] = useState(
    shopInfo.widgetbutttontext
  );
  const [faqHeader, setfaqHeader] = useState(shopInfo.faqheader);
  const [faqHeaderSubheading, setfaqHeaderSubheading] = useState(
    shopInfo.faqheadersub
  );
  const [rewardsHeading, setrewardsHeading] = useState(shopInfo.rewardsHeading);
  const [rewardsHeadingsub, setrewardsHeadingsub] = useState(
    shopInfo.rewardsSubHeading
  );
  const [trackOrderHeading, settrackOrderHeading] = useState(
    shopInfo.trackOrderHeading
  );
  const [trackOrderSubHeading, settrackOrderSubHeading] = useState(
    shopInfo.trackOrderSubHeading
  );
  const [inputList, setInputList] = useState(shopInfo.faqslist);
  const [boxheading3, setboxheading3] = useState("Redeem points");
  const [box2description, setbox2description] = useState(
    "Enter your phone number to know how many reward points you have won with your phone number"
  );
  const [box3descriptionreward, setbox3descriptionreward] = useState(
    "Nice you can generate a coupon code using available points"
  );
  const [box3descriptionrewardnot, setbox3descriptionrewardnot] = useState(
    "Sorry!! you dont have any reward point"
  );
  const [rewardPointsDescription, setrewardPointsDescription] = useState(
    shopInfo.rewardPointsDescription
  );
  const [phonestatus, setPhonestatus] = useState({});

  const primaryColorhandlechange = (event) => {
    setprimarycolor(event.target.value);
    UserService.loadprimarycolor(dispatch, event.target.value);
  };
  const secondaryColorhandlechange = (event) => {
    setsecondarycolor(event.target.value);
    UserService.loadsecondarycolor(dispatch, event.target.value);
  };
  const backgroundcolorhandlechange = (event) => {
    setbackgroundcolor(event.target.value);
    UserService.loadbackgroundcolor(dispatch, event.target.value);
  };
  const tertiaryhandlechange = (event) => {
    settertiarycolor(event.target.value);
    UserService.loadtertiaryColor(dispatch, event.target.value);
  };
  const rewardcolorhandlechange = (event) => {
    setrewardcolor(event.target.value);
    UserService.loadrewardcolor(dispatch, event.target.value);
  };

  const positionwigetshandlechange = (event) => {
    setpositionwigets(event.target.value);
    UserService.loadwidgetposition(dispatch, event.target.value);
  };

  const statuswigetshandlechange = (event) => {
    setstatus(event.target.value);
    UserService.loadwidgetstatus(dispatch, event.target.value);
  };

  const widgetsbuttonhandlechange = (event) => {
    setwidgetsbuttontext(event.target.value);
    UserService.loadwidgetbuttontext(dispatch, event.target.value);
  };

  const faqHeaderhandlechange = (event) => {
    setfaqHeader(event.target.value);
    UserService.loadfaqHeader(dispatch, event.target.value);
  };
  const trackOrderHeadingtexthandlechange = (event) => {
    settrackOrderHeading(event.target.value);
    UserService.loadtrackOrderHeading(dispatch, event.target.value);
  };

  const trackOrderSubHeadingtexthandlechange = (event) => {
    settrackOrderSubHeading(event.target.value);
    UserService.loadtrackOrderHeadingsub(dispatch, event.target.value);
  };

  const boxheading2handlechange = (event) => {
    setboxheading2(event.target.value);
  };

  const boxheading3handlechange = (event) => {
    setboxheading3(event.target.value);
  };

  const box2descriptionhandlechange = (event) => {
    setbox2description(event.target.value);
  };

  const box3descriptionrewardhandlechange = (event) => {
    setbox3descriptionreward(event.target.value);
  };

  const box3descriptionrewardnothandlechange = (event) => {
    setbox3descriptionrewardnot(event.target.value);
  };

  const rewardPointsDescriptionhandlechange = (event) => {
    setrewardPointsDescription(event.target.value);
    UserService.loadrewardPointsDescription(dispatch, event.target.value);
  };

  const faqHeaderSubheadinghandlechange = (event) => {
    setfaqHeaderSubheading(event.target.value);
    UserService.loadfaqHeadersub(dispatch, event.target.value);
  };

  const rewardsHeadinghandlechange = (event) => {
    setrewardsHeading(event.target.value);
    UserService.loadrewardsHeading(dispatch, event.target.value);
  };

  const rewardsHeadingsubhandlechange = (event) => {
    setrewardsHeadingsub(event.target.value);
    UserService.loadrewardsHeadingsub(dispatch, event.target.value);
  };

  const clientNameonhandlechnage = (event) => {
    UserService.loadnewclientName(dispatch, event.target.value);
    setclientName(event.target.value);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    // console.log(list)
    UserService.loadnewfaq(dispatch, list);
    setInputList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = shopInfo.faqslist;
    list.splice(index, 1);
    console.log(list);
    UserService.loadnewfaq(dispatch, list);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    const list = [{ question: "asa", answer: "asas" }];
    UserService.loadnewfaqfield(dispatch, list);
    setInputList([...inputList, { question: "asa", answer: "asas" }]);
  };
  useEffect(() => {
    setInputList(shopInfo.faqslist);
    setprimarycolor(shopInfo.primaryColor);
  }, []);
  console.log(shopInfo.shopName);
  const phoneValidation = () => {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    return !(!phoneNumber || regex.test(phoneNumber) === false);
  };
  useEffect(() => {
    const checkphoneValidation = phoneValidation();
    if (checkphoneValidation == false) {
      setphonevalidationError(false);
    } else {
      setphonevalidationError(true);
    }
  }, [phoneNumber]);
  const phoneNumberonhandlechnage = (e) => {
    setphoneNumber(e.target.value);
    UserService.loadnewphonenumber(dispatch, e.target.value);
  };
  console.log(phonevalidationError);

  // console.log(shopInfo.loader);
  const onsaveButtonClickhandle = (e) => {
    const loader = true;
    UserService.loadLoader(dispatch, loader);
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const body = {
      type: "shopify_widget_details",
      client_id: shopInfo.shopName,
      properties: {
        status: shopInfo.status,
        colors: {
          primaryColor: shopInfo.primaryColor,
          secondaryColor: shopInfo.secondaryColor,
          teritaryColor: shopInfo.tertiaryColor,
          backgroundColor: shopInfo.backgroundColor,
          rewardPointsColor: shopInfo.rewardpointColor,
        },
        config: {
          position: positionwigets,
          websiteUrl: websiteurlText,
          clientName: shopInfo.clientName,
          phoneNumber: shopInfo.phoneNumber,
        },
        text: {
          widgetButton: shopInfo.widgetbutttontext,
          faqHeader: shopInfo.faqheader,
          faqSubHeading: shopInfo.faqheadersub,
          rewardsHeading: shopInfo.rewardsHeading,
          rewardsSubHeading: shopInfo.rewardsSubHeading,
          rewardPointsDescription: shopInfo.rewardPointsDescription,
          trackOrderHeading: shopInfo.trackOrderHeading,
          trackOrderSubHeading: shopInfo.trackOrderSubHeading,
        },
        faqs: shopInfo.faqslist,
      },
    };
    UserService.saveSettings(dispatch, body);
    console.log(JSON.stringify(body));
  };
  console.log(shopInfo.status);
  return (
    <>
      <Row>
        <Row className="align-items-start mb-2">
          <Col sm={6}>
            <p>Primary Color:</p>
          </Col>

          <Col sm={6} className="d-flex align-items-center">
            <input
              type="color"
              id="primarycolor"
              value={primarycolor}
              onChange={primaryColorhandlechange}
              className="input_color"
            />
            <label htmlFor="primarycolor">{primarycolor}</label>
          </Col>
        </Row>

        <Row className="align-items-start mb-2">
          <Col sm={6}>
            <p>Seconadary color:</p>
          </Col>

          <Col sm={6} className="d-flex align-items-center mb-2">
            <input
              type="color"
              id="secondarycolor"
              value={secondarycolor}
              onChange={secondaryColorhandlechange}
              className="input_color"
            />
            <label htmlFor="secondarycolor">{secondarycolor}</label>
          </Col>
        </Row>

        <Row className="align-items-start mb-2">
          <Col sm={6}>
            <p>Background color:</p>
          </Col>

          <Col sm={6} className="d-flex align-items-center">
            <input
              type="color"
              id="backgroundcolor"
              value={backgroundcolor}
              onChange={backgroundcolorhandlechange}
              className="input_color"
            />
            <label htmlFor="backgroundcolor">{backgroundcolor}</label>
          </Col>
        </Row>
        <Row className="align-items-start mb-2">
          <Col sm={6}>
            <p>Tertiary color:</p>
          </Col>

          <Col sm={6} className="d-flex align-items-center">
            <input
              type="color"
              id="textcolor"
              value={tertiarycolor}
              onChange={tertiaryhandlechange}
              className="input_color"
            />
            <label htmlFor="textcolor">{tertiarycolor}</label>
          </Col>
        </Row>
        <Row className="align-items-start mb-2">
          <Col sm={6}>
            <p>Reward point color:</p>
          </Col>

          <Col sm={6} className="d-flex align-items-center">
            <input
              type="color"
              id="rewardcolor"
              value={rewardcolor}
              onChange={rewardcolorhandlechange}
              className="input_color"
            />
            <label htmlFor="rewardcolor">{rewardcolor}</label>
          </Col>
        </Row>
        <hr />
        <div className="posiotion_wiget_app mb-2">
          <label htmlFor="positionwiget">Position</label>
          <Form.Select
            aria-label="Default select example"
            id="positionwiget"
            onChange={positionwigetshandlechange}
            value={positionwigets}
          >
            <option value="left">left</option>
            <option value="right">right</option>
          </Form.Select>
        </div>
        <div className="posiotion_wiget_app mb-2">
          <label htmlFor="positionwiget">App status</label>
          <Form.Select
            aria-label="Default select example"
            id="statuswiget"
            onChange={statuswigetshandlechange}
            value={status}
          >
            <option value="on">on</option>
            <option value="off">off</option>
          </Form.Select>
        </div>

        <div className="websiteurl mb-2">
          <Form.Label htmlFor="websiteurl">Website Url</Form.Label>
          <Form.Control type="text" id="websiteurl" defaultValue={websiteurl} />
        </div>
        <div className="clientname">
          <Form.Label htmlFor="clientname">Client Name</Form.Label>
          <Form.Control
            type="text"
            id="clientname"
            value={clientName}
            onChange={clientNameonhandlechnage}
          />
        </div>

        <div className="phonenumber mt-3">
          {/* <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            className="form-control d-flex"
            onChange={setphoneNumber}
          /> */}
          <Form.Control
            type="text"
            id="phonenumber"
            value={phoneNumber}
            onChange={phoneNumberonhandlechnage}
          />
          {phonevalidationError === false ? (
            <Alert variant="danger" className="mt-2">
              Enter Valid Phone Number !!!!
            </Alert>
          ) : (
            ""
          )}
        </div>

        <hr className="my-4" />
        <div className="wigets_button_text mb-2">
          <Form.Label htmlFor="wigets_button_text">
            Widget button text
          </Form.Label>
          <Form.Control
            type="text"
            id="wigets_button_text"
            defaultValue={widgetsbuttontext}
            onChange={widgetsbuttonhandlechange}
          />
        </div>
        <div className="box_heading_1 mb-2">
          <Form.Label htmlFor="box_heading_1">Faq Header</Form.Label>
          <Form.Control
            type="text"
            id="faqHeader"
            defaultValue={faqHeader}
            onChange={faqHeaderhandlechange}
          />
        </div>

        <div className="box_heading_1 mb-2">
          <Form.Label htmlFor="box_heading_1">Faq Sub Header</Form.Label>
          <Form.Control
            type="text"
            id="faqHeaderSubheading"
            defaultValue={faqHeaderSubheading}
            onChange={faqHeaderSubheadinghandlechange}
          />
        </div>

        <div className="rewardsHeading mb-2">
          <Form.Label htmlFor="box_heading_1">Rewards Heading</Form.Label>
          <Form.Control
            type="text"
            id="rewardsHeading"
            defaultValue={rewardsHeading}
            onChange={rewardsHeadinghandlechange}
          />
        </div>

        <div className="rewardsHeadingsub mb-2">
          <Form.Label htmlFor="box_heading_1">Rewards Sub Heading</Form.Label>
          <Form.Control
            type="text"
            id="rewardsHeadingsub"
            defaultValue={rewardsHeadingsub}
            onChange={rewardsHeadingsubhandlechange}
          />
        </div>

        <div className="rewardPointsDescription mb-2">
          <Form.Label htmlFor="rewardPointsDescription">
            Reward PointsDescription
          </Form.Label>
          <Form.Control
            as="textarea"
            defaultValue={rewardPointsDescription}
            placeholder={rewardPointsDescription}
            style={{ height: "100px" }}
            onChange={rewardPointsDescriptionhandlechange}
            id="rewards_point_description"
          />
        </div>

        <div className="box_1_button_text mb-2">
          <Form.Label htmlFor="box_1_button_text">
            Track OrderHeading
          </Form.Label>
          <Form.Control
            type="text"
            id="trackOrderHeading"
            defaultValue={trackOrderHeading}
            onChange={trackOrderHeadingtexthandlechange}
          />
        </div>

        <div className="box_1_button_text mb-2">
          <Form.Label htmlFor="box_1_button_text">
            Track OrderHeading
          </Form.Label>
          <Form.Control
            type="text"
            id="trackOrderSubHeading"
            defaultValue={trackOrderSubHeading}
            onChange={trackOrderSubHeadingtexthandlechange}
          />
        </div>
        <hr className="my-4" />
        <p>Faq Lists</p>
        {shopInfo.faqslist.map((x, i) => {
          return (
            <div className="box" key={i}>
              <span>{`Que.${i + 1}`}</span>
              <input
                name="question"
                className="form-control mb-2"
                placeholder="Enter Question"
                value={x.question}
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                className="ml10 form-control"
                name="answer"
                placeholder="Enter Answer"
                value={x.answer}
                onChange={(e) => handleInputChange(e, i)}
              />
              <div className="btn-box">
                {shopInfo.faqslist.length !== 1 && (
                  <button
                    className="btn btn-primary my-2 inputbuttons"
                    onClick={() => handleRemoveClick(i)}
                  >
                    Remove
                  </button>
                )}
                {shopInfo.faqslist.length - 1 === i && (
                  <button
                    className="btn btn-primary ms-2 inputbuttons"
                    onClick={handleAddClick}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <Button
          variant="primary"
          id="savesettings"
          className="mb-4 mt-3"
          onClick={onsaveButtonClickhandle}
        >
          {shopInfo.loader == true ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "save"
          )}

          <span className="save_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </span>
        </Button>
      </Row>
    </>
  );
}

export default Settings;
