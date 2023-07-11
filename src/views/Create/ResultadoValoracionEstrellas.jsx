import React from 'react';
import '../../styles/resultadoOpcionMultiple.css';
import { Col, Container } from 'react-bootstrap';

function ResultadoValoracionEstrellas({ index, pregunta, opciones, color, selectedIcon  }) {
    const ningunaOpcion = {
        id: 'ninguna',
        text: 'Ninguna de las anteriores',
        type: 'radio',
        checked: false,
    };

    const otro = {
        id: 'otro',
        text: 'Otro',
        type: 'radio',
        checked: false,
    };

    return (
        <Container className='container-resultadoOpcionMultiple'>
            <p>{index + 1}. {pregunta}</p>

            <Col style={{ display: 'flex' }}>
                {opciones.map((opcion) => (
                    <Col key={opcion.id} style={{ marginRight: '2%' }}>
                        <Col>
                        <div style={{ marginBottom: '25%', textAlign: 'center' }}>
                            {opcion.text}
                        </div>
                        <div>
                            <span
                                style={{
                                    marginLeft: '2%',
                                    cursor: 'pointer',
                                    marginTop: '0.8%',
                                    fill: color[opcion.icono],
                                    stroke: color[opcion.icono],
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: selectedIcon[opcion.icono] || opcion.icono,
                                }}
                            />
                        </div>
                        </Col>
                    </Col>
                ))}
            </Col>

            <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                <Col style={{display: 'flex'}}>
                    <div>
                    <input
                        type={ningunaOpcion.type}
                        name={`opcion_${ningunaOpcion.id}`}
                        value={ningunaOpcion.id}
                        checked={ningunaOpcion.checked}
                        onChange={() => {}}
                    />
                    </div>
                    <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                    {ningunaOpcion.text}
                    </div>
                </Col>
            </Col>

            <Col style={{ marginRight: '2%', marginTop: '1%' }}>
                <Col style={{display: 'flex'}}>
                    <div>
                    <input
                        type={otro.type}
                        name={`opcion_${otro.id}`}
                        value={otro.id}
                        checked={otro.checked}
                        onChange={() => {}}
                    />
                    </div>
                    <div style={{ marginBottom: '0.4%', marginLeft: '2%', textAlign: 'center' }}>
                    {otro.text}
                    </div>
                </Col>
            </Col>
        </Container>
    );
}

export default ResultadoValoracionEstrellas;
