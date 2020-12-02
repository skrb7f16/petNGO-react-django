import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Accordion } from 'react-bootstrap'


function Donation(props) {
    return (
        <Card>
            <Card.Header>{props.data.doneOn.split('T')[0]}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                            Done a generous donation of Rs.
                            {" " + props.data.amount}
                        {' '}
                    </p>
                    <footer className="blockquote-footer">
                        Done at <cite title="Source Title">{props.data.doneOn.split('T')[1].split('.')[0]}</cite>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}





export default function Donations(props) {
    const [amount, setAmount] = useState(0)
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.isLoggedIn) {
            fetch(props.baseUrl + "api/user/donations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token  ${localStorage.getItem('TOKEN')}`
                }
            }).then(res => res.json()).then(response => setData(response))
        }
    },[])

    function handleDonation(e) {
        e.preventDefault();
        const amountData = {
            "amount": amount
        }
        fetch(props.baseUrl + "api/user/donations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token  ${localStorage.getItem('TOKEN')}`
            },
            body: JSON.stringify(amountData)
        }).then(res => res.json()).then(response => {
            alert(response.msg+" of Rs "+amount)
            setAmount(0)
        })
    }
    return (
        <div className="container">
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Add A Donation
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body >
                            <Form>
                                <Form.Group controlId="amount">
                                    <Form.Label>Donation Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Amount"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={e => handleDonation(e)}>
                                    Donate
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
                            Your Donations !!!!
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body >
                            {data.map(e => {
                                return <Donation data={e} key={e.id} />
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
