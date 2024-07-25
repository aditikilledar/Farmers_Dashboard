import React, { useState } from 'react';
import { Navbar, Container, Nav, Card, Form, Button } from 'react-bootstrap';

const ManageCrops:React.FC = () => {
    const [ cropPlanted, setCropPlanted] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [ harvestedCrop, setHarvestedCrop ] = useState('');
    const [ harvestedQuantity, setHarvestedQuantity] = useState(0)


    const handlePlantedCropsSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        console.log(event.currentTarget)
        const formData = new FormData(event.currentTarget);
        const formValue1 = formData.get('planted');
        const formValue2 = formData.get('plantedQuantity');

        if(formValue1 !== null && typeof formValue1 === 'string' && formValue2 !== null && typeof formValue2 === 'string'){
            setCropPlanted(formValue1)
            setQuantity(parseInt(formValue2))
            try{
                const response = await fetch('/addCrop', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "plantedCrop": cropPlanted, "plantedQuantity":quantity })
                });
                const data = await response.json();
            }
            catch(error){
                console.log(error)
            }
        }
    }

    const handleHarvestedCropsSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // console.log(event)
        const formData = new FormData(event.currentTarget);
        const formValue1 = formData.get('harvestedCrop');
        const formValue2 = formData.get('harvestedQuantity');

        if(formValue1 !== null && typeof formValue1 === 'string' && formValue2 !== null && typeof formValue2 === 'string'){
            setHarvestedCrop(formValue1)
            setHarvestedQuantity(parseInt(formValue2))
            try{
                const response = await fetch('/addCrop', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "harvestedCrop": harvestedCrop, "harvestedQuantity":harvestedQuantity })
                });
                const data = await response.json();
            }
            catch(error){
                console.log(error)
            }
            
        }
    }

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
                                <h5 className="card-title">Planted Crops</h5>
                                <Form onSubmit={handlePlantedCropsSubmit}> 
                                {/* className="left-div" style={{ float: 'left', width: '50%' }} */}
                                    <Form.Group controlId="cropPlanted">
                                        <Form.Label>Crop Planted:</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="planted" 
                                            // value={cropPlanted} 
                                            // onChange={(e) => setCropPlanted(e.target.value)}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="plantedQuantity">
                                        <Form.Label>Quantity:</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="plantedQuantity" 
                                            // value={quantity}
                                            required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Add Plant</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-6 mb-4">
                        <Card style={{ height: '100%', borderRadius: '25px' }}>
                            <Card.Body>
                                <h5 className="card-title">Harvested Crops</h5>
                                <Form onSubmit={handleHarvestedCropsSubmit}>
                                    <Form.Group controlId="cropHarvested">
                                        <Form.Label>Harvested Crop: </Form.Label>
                                        <Form.Control type="text" name="harvestedCrop" required />
                                    </Form.Group>
                                    <Form.Group controlId="harvestedQuantity">
                                        <Form.Label>Harvested Quantity: </Form.Label>
                                        <Form.Control type="number" name="harvestedQuantity" required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Save Harvested Crops</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default ManageCrops