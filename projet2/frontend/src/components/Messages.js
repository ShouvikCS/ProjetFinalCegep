import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();  // This captures "3" from "/messages/3"

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://127.0.0.1:8000/current_user/', { withCredentials: true });
                setCurrentUser(userResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchMessages = async () => {
            try {
                const messagesResponse = await axios.get(`http://127.0.0.1:8000/messages/between/${currentUser.id}/${userId}/`, { withCredentials: true });
                setMessages(messagesResponse.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchUserData().then(fetchMessages);
    }, [userId]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/messages/create/`, {
                text: messageText,
                recipient_id: userId
            }, {
                withCredentials: true
            });
            setMessages([...messages, response.data.data]);  // Add new message to local state
            setMessageText('');  // Clear input field
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <h2>Messages</h2>
                    <ListGroup>
                        {messages.map((msg, index) => (
                            <ListGroup.Item key={index} className={`d-flex justify-content-${msg.sender === currentUser.id ? 'end' : 'start'}`}>
                                <div className={`p-3 rounded bg-${msg.sender === currentUser.id ? 'primary text-white' : 'light'}`}>
                                    {msg.text}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Form onSubmit={handleSendMessage}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Type a message..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                            />
                            <Button variant="primary" type="submit">Send</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Messages;
