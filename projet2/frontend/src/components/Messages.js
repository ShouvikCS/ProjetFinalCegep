import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const { userId } = useParams();  

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/current_user/', { withCredentials: true });
                setCurrentUser(response.data);
                fetchMessages(response.data.id); 
            } catch (error) {
                console.error('Error fetching current user:', error);
                setCurrentUser(null);
            }
        };

        const fetchMessages = async (currentUserId) => {
            try {
                const messagesResponse = await axios.get(`http://127.0.0.1:8000/messages/${userId}/`, { withCredentials: true });
                console.log("Fetched messages:", messagesResponse.data);
                setMessages(messagesResponse.data.map(msg => ({
                    ...msg,
                    isCurrentUser: msg.sender === currentUserId
                })));
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchCurrentUser();
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
            setMessages([...messages, { ...response.data, isCurrentUser: true }]);
            setMessageText('');  
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
                            <ListGroup.Item key={index} className={`d-flex justify-content-${msg.isCurrentUser ? 'end' : 'start'}`}>
                                <div className={`p-3 rounded bg-${msg.isCurrentUser ? 'primary text-white' : 'light'}`}>
                                   {msg.isCurrentUser ? '' : "User " + msg.sender + ":"} <strong>{msg.content} </strong>
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
