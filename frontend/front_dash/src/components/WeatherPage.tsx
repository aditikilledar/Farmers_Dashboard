import React, { useState } from 'react';
import { Navbar, Container, Nav, Card, Form, Button } from 'react-bootstrap';

const WeatherPage: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [cropRecommendation, setCropRecommendation] = useState<string>('');
    const [cropBotResponse, setCropBotResponse] = useState<string>('');

    const handleWeatherSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Fetch weather data here and update state
        // Replace the URL with your actual endpoint
        const response = await fetch('/get_weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city })
        });
        const data = await response.json();
        setWeatherData(data);
    };

    const handleCropRecommendationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const soil = formData.get('soil') as string;
        const season = formData.get('season') as string;
        const location = formData.get('location') as string;
        const weather = formData.get('weather') as string;
        const question = `I have the ${soil} soil type, it's ${season} season, in ${location}. Based on the above data, which ONE crop should I plant Output format is CROP_NAME`;

        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        setCropRecommendation(data.message.trim());
    };

    const handleCropBotSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const chatQuestion = formData.get('chat') as string;

        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: chatQuestion })
        });
        const data = await response.json();
        setCropBotResponse(data.message.trim());
    };

    return (
        <div style={{ backgroundColor: '#D4E7C5', minHeight: '100vh' }}>
            <Navbar bg="light" expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/">Farmer's Buddy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Dashboard</Nav.Link>
                            {document.cookie.includes('username') ? (
                                <>
                                    <Nav.Link href="/logout">Logout</Nav.Link>
                                    <Nav.Link href="/add_plant">Crop Manager</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/signup">Sign up</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <Card style={{ height: '100%', borderRadius: '25px' }}>
                            <Card.Body>
                                <h5 className="card-title">Weather</h5>
                                <Form onSubmit={handleWeatherSubmit}>
                                    <Form.Group controlId="city">
                                        <Form.Label>Enter City:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Search</Button>
                                </Form>
                                <br />
                                {weatherData && (
                                    <div>
                                        <div className="left-div" style={{ float: 'left', width: '50%' }}>
                                            <p>Weather in {weatherData.city}</p>
                                            <p>Temperature: {(weatherData.temperature - 273).toFixed(2)}°C</p>
                                            <p>Description: {weatherData.description}</p>
                                        </div>
                                        <div className="right-div" style={{ float: 'left', width: '50%' }}>
                                            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" style={{ width: '60%', height: '60%' }} />
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </div>

                    {/* <div className="col-md-6 mb-4">
                        <Card style={{ height: '100%', borderRadius: '25px' }}>
                            <Card.Body>
                                <h5 className="card-title">Crop Life Statistics</h5>
                                {document.cookie.includes('username') ? (
                                    <>
                                        <p className="card-title">Planted: {document.cookie.split('; ').find(row => row.startsWith('crop_planted')).split('=')[1]}</p>
                                        <p className="card-title">Harvested: {document.cookie.split('; ').find(row => row.startsWith('crop_harvested')).split('=')[1]}</p>
                                    </>
                                ) : (
                                    <p className="card-text">Login to view your crop statistics</p>
                                )}
                            </Card.Body>
                        </Card>
                    </div> */}
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <Card style={{ height: '100%', borderRadius: '25px' }}>
                            <Card.Body>
                                <h5 className="card-title">Crop Recommendation</h5>
                                <p className="card-text">Find a crop that suits your custom environmental conditions. Enter the information below.</p>
                                <Form onSubmit={handleCropRecommendationSubmit} className="left-div" style={{ float: 'left', width: '50%' }}>
                                    <Form.Group controlId="soil">
                                        <Form.Label>Soil:</Form.Label>
                                        <Form.Control type="text" name="soil" required />
                                    </Form.Group>
                                    <Form.Group controlId="season">
                                        <Form.Label>Season:</Form.Label>
                                        <Form.Control type="text" name="season" required />
                                    </Form.Group>
                                    <Form.Group controlId="location">
                                        <Form.Label>Location:</Form.Label>
                                        <Form.Control type="text" name="location" required />
                                    </Form.Group>
                                    <Form.Group controlId="weather">
                                        <Form.Label>Weather:</Form.Label>
                                        <Form.Control type="text" name="weather" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Ask</Button>
                                </Form>
                                <br />
                                <div id="answer" className="right-div" style={{ float: 'left', width: '50%', overflow: 'auto' }}>
                                    {cropRecommendation}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-6 mb-4">
                        <Card style={{ height: '100%', borderRadius: '25px' }}>
                            <Card.Body>
                                <h5 className="card-title">CropBot</h5>
                                <p className="card-text">If you have specific questions about the lifecycle of your crops, ask CropBot!</p>
                                <Form onSubmit={handleCropBotSubmit}>
                                    <Form.Group controlId="chat">
                                        <Form.Control type="text" name="chat" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Ask</Button>
                                </Form>
                                <br />
                                <div id="response" style={{ overflow: 'auto' }}>{cropBotResponse}</div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default WeatherPage;
