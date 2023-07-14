import React, { useState } from 'react'
import '../styles/create.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import svgManager from '../assets/svg';
import DiseñaEncuesta from './Create/DiseñaEncuesta';
import Revision from './Create/Revision';

const circleSVG = svgManager.getSVG('circle');
const chevronsNightSVG = svgManager.getSVG('chevron-rigth');
const eyeSVG = svgManager.getSVG('eye');

const Create = () => {
    const [activeTab, setActiveTab] = useState('diseña');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    const getIconStrokeColor = (tab) => {
        return activeTab === tab ? 'rgba(255, 199, 0, 1)' : 'rgba(216, 216, 216, 1)';
    }

    return (
        <>
            <Container fluid className='encuesta-container'>
                <Row>
                    <Col xs={2} className="encuestas_coltitulo_create">
                        <h2 className='encuesta-titulo-create'>Encuesta Veris</h2>
                    </Col>
                    
                    <Col xs={2} className="encuestas_colsg_create">
                        <div className={`encuestas_colsg_create_1 ${activeTab !== 'diseña' ? 'inactive' : ''}`}>
                            <div 
                                className={`encuestas_colsg1 ${activeTab === 'diseña' ? 'active' : ''}`}
                                onClick={() => handleTabChange('diseña')}
                                style={{position: 'relative', width: '180px', height: '50px', cursor: 'pointer'}}
                            >
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '0', 
                                    left: '0', 
                                    width: '17.2%', 
                                    height: '92%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontStyle: 'normal',
                                    color: 'rgba(32, 32, 32, 1)',
                                    fontWeight: 'bold'
                                }}>
                                    1
                                </div>
                                <span 
                                    className='imgcircle' 
                                    dangerouslySetInnerHTML={{ __html: circleSVG.replace(/stroke="([^"]*)"/, `stroke="${getIconStrokeColor('diseña')}"`) }}
                                />
                                <h2 className='encuesta-sg-create_1_1'>Diseña Encuesta</h2>
                            </div>

                            <div>
                                <span className='imgchevron' dangerouslySetInnerHTML={{ __html: chevronsNightSVG }}/>
                            </div>

                            <div 
                                className={`encuestas_colsg1 ${activeTab === 'revision' ? 'active' : ''}`}
                                onClick={() => handleTabChange('revision')}
                                style={{position: 'relative', width: '180px', height: '50px', cursor: 'pointer'}}
                            >
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '0', 
                                    left: '0', 
                                    width: '17.6%', 
                                    height: '92%', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontStyle: 'normal',
                                    color: 'rgba(32, 32, 32, 1)',
                                    fontWeight: 'bold'
                                }}>
                                    2
                                </div>
                                <span 
                                    className='imgcircle' 
                                    dangerouslySetInnerHTML={{ __html: circleSVG.replace(/stroke="([^"]*)"/, `stroke="${getIconStrokeColor('revision')}"`) }}
                                />
                                <h2 className='encuesta-sg-create_1_2'>Revisión</h2>
                            </div>
                        </div>

                        <div className='encuestas_colsg_create_2'>
                            <Button className='encuesta-sg-buttonv-create'>
                                <p style={{ marginLeft: '3px', marginRight: '2px'}}>Vista previa</p>
                                <span style={{marginTop: '7px'}} dangerouslySetInnerHTML={{ __html: eyeSVG }}/>
                            </Button>
                            
                            {activeTab !== 'revision' && (
                                <Button 
                                    className='encuesta-sg-buttons-create'
                                    onClick={() => handleTabChange('revision')}
                                >
                                    Siguiente
                                </Button>
                            )}
                        </div>
                    </Col>
                    <hr />
                    
                    {activeTab === 'diseña' ? <DiseñaEncuesta /> : null}
                    {activeTab === 'revision' ? <Revision /> : null}
                </Row>
            </Container> 
        </>
    )  
}

export default Create
