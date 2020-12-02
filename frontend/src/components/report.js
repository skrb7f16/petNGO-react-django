import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Accordion } from 'react-bootstrap'


function Report(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"http://localhost:8000"+props.data.pic} />
            <Card.Body>
                <Card.Title>{props.data.doneOn.split('T')[0]}{" "+props.data.type}</Card.Title>
                <Card.Text>
                    {props.data.report}
                </Card.Text>
                <footer className="blockquote-footer">
                        Done at <cite title="Source Title">{props.data.doneOn.split('T')[1].split('.')[0]}</cite>
                    </footer>
            </Card.Body>
        </Card>
    )
}





export default function Reports(props) {
    const [report, setReport] = useState("")
    const [pic, setPic] = useState(null)
    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.isLoggedIn) {
            fetch(props.baseUrl + "api/user/reports", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token  ${localStorage.getItem('TOKEN')}`
                }
            }).then(res => res.json()).then(response => setData(response))
        }
    }, [])

    async function handleReport(e) {
        e.preventDefault()
        const reportData = new FormData()
        reportData.append("report", report)
        reportData.append("pic", pic, pic.name)
        reportData.append('type', type)
        reportData.append('breed', breed)
        fetch(props.baseUrl + "api/user/reports", {
            method: "POST",
            headers: {
                Authorization: `Token  ${localStorage.getItem('TOKEN')}`
            },
            body: reportData
        }).then(res => res.json()).then(response => {
            alert(response.msg)
            // setReport('')
            setBreed('')
            setType('')
            // setPic(null)
        })
    }
    return (
        <div className="container">
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Add A Report
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body >
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Enter Your Report</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={report}
                                        onChange={e => setReport(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. cat,dog"
                                        value={type}
                                        onChange={e => setType(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Breed</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="breed"
                                        value={breed}
                                        onChange={e => setBreed(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.File
                                        id="exampleFormControlFile1"
                                        label="Picture if possible"
                                        onChange={e => {
                                            setPic(e.target.files[0])

                                        }}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={e => handleReport(e)}>
                                    Report
                                </Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Your Reports !!!!
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body className="d-flex">
                            {data.map(e => {
                                if (e.message) {
                                    return <h1 key={1}>e.message</h1>
                                }
                                return <Report data={e} key={e.id} />
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
