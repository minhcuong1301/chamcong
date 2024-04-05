import { TYPE_KEEPING } from "utils/constants/config";
import { Button, Radio, Row, Col, Input, Form, message, Spin } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import dayjs from "dayjs";
import { actionTimeKeeping } from "./actions";

const Camera = () => {
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [listTimeKeeping, setListTimeKeeping] = useState([]);
    const [text, setText] = useState("")
    const [spining, setSpinning] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth - 16);
    const videoWidth = Math.min(windowWidth, 540);
    const videoHeight = videoWidth * (3 / 4);

    const handleClick = (value) => {
        if (selectedValue === value) {
            setSelectedValue(null); 
        } else {
            setSelectedValue(value); 
        }
    };

    const updateWindowWidth = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);



    const videoConstraints = {
        width: videoWidth,
        height: videoHeight,
        facingMode: "environment"
    };

    const capturePhoto = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }, [webcamRef]);

    const onUserMedia = (e) => {
    };


    const handleTimeKepping = async () => {
        setSpinning(true)
        try {

            const params = {
                avatar: url.replace('data:image/jpeg;base64,', ""),
                time_keeping: dayjs().unix(),
                devide_name: "dsd",
                devide_id: "ewfwe",
                type_keeping: selectedValue || null,
                description: text || null,


            };

            const { data, status } = await actionTimeKeeping(params)
            if (status == 200) {
                message.success(data?.message)

                setListTimeKeeping(data?.list_keeping_time)
                window.navigatePage('historyTime')

            }

        } catch (error) {
            console.log(error);
        }
        setSpinning(false)
    }

    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, [updateWindowWidth]);


    return (
        <Spin spinning={spining}>
            <div style={{ position: "relative", width: videoWidth, height: videoHeight }}>
                <Row gutter={[16, 16]}>
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        onUserMedia={onUserMedia}
                    />
                    {url && (
                        <img
                            src={url}
                            alt="Screenshot"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    )}

                    <Col span={24}>
                        <Radio.Group className="w-full" value={selectedValue} >
                            <Row gutter={[4, 12]} >
                                {Object.keys(TYPE_KEEPING).map((key) =>
                                    <Col key={key} md={8} xs={8}>
                                        <Radio value={key} onClick={() => handleClick(key)}>
                                            {TYPE_KEEPING[key]}
                                        </Radio>
                                    </Col>
                                )}
                            </Row>
                        </Radio.Group>

                    </Col>

                    <Col span={24}>
                        <Input.TextArea rows={3} placeholder="Ghi chú"
                            onChange={e => setText(e.target.value)}
                            value={text}
                        />
                    </Col>


                </Row>


                <Row gutter={[16, 0]} justify={"center"} style={{ marginTop: "16px" }}>
                    {url ?
                        (
                            <>
                                <Col >
                                    <Button onClick={() => setUrl(null)} >
                                        Chụp lại
                                    </Button>
                                </Col>

                                <Col >
                                    <Button type="primary"
                                        onClick={handleTimeKepping}
                                    >
                                        Gửi
                                    </Button>
                                </Col>
                            </>

                        ) : (
                            <Row gutter={[16, 0]}> 
                                <Col>
                                    <Button type="primary" onClick={capturePhoto} >
                                        Chụp
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => window.navigatePage("historyTime")} >
                                        Lịch sử
                                    </Button>
                                </Col>
                            </Row>

                        )
                    }

                </Row>



            </div>
        </Spin>



    );
};

export default Camera;
