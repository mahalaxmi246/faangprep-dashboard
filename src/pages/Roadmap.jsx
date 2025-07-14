import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Badge, ProgressBar } from 'react-bootstrap';
import { useData } from '../context/DataContext';

const Roadmap = () => {
  const { roadmapData, setRoadmapData, systemDesignRoadmap, setSystemDesignRoadmap } = useData();

  const toggleWeekCompletion = (week) => {
    setRoadmapData(roadmapData.map(item =>
      item.week === week ? { ...item, completed: !item.completed } : item
    ));
  };

  const toggleSystemDesignWeekCompletion = (week) => {
    setSystemDesignRoadmap(systemDesignRoadmap.map(item =>
      item.week === week ? { ...item, completed: !item.completed } : item
    ));
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'Foundation': return 'primary';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      case 'Practice': return 'success';
      default: return 'secondary';
    }
  };

  const completedWeeks = roadmapData.filter(item => item.completed).length;
  const totalWeeks = roadmapData.length;
  const overallProgress = Math.round((completedWeeks / totalWeeks) * 100);

  const phases = [...new Set(roadmapData.map(item => item.phase))];

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h1 className="display-6 fw-bold mb-4">🗺️ 90-Day FAANG Preparation Roadmap</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-2">Overall Roadmap Progress</h5>
                  <ProgressBar now={overallProgress} variant="info" className="mb-2" />
                  <small className="text-muted">
                    {completedWeeks} of {totalWeeks} weeks completed
                  </small>
                </Col>
                <Col md={4} className="text-center">
                  <h2 className="text-info mb-0">{overallProgress}%</h2>
                  <small className="text-muted">Complete</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h3 className="mb-4">🧮 DSA Learning Path (12 Weeks)</h3>
          {phases.map(phase => (
            <div key={phase} className="mb-4">
              <h5 className="mb-3">
                <Badge bg={getPhaseColor(phase)} className="me-2">
                  {phase}
                </Badge>
                Phase
              </h5>
              <Row>
                {roadmapData
                  .filter(item => item.phase === phase)
                  .map((item) => (
                    <Col lg={4} md={6} key={item.week} className="mb-3">
                      <Card 
                        className={`roadmap-card h-100 ${item.completed ? 'completed border-success' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleWeekCompletion(item.week)}
                      >
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <Form.Check
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => toggleWeekCompletion(item.week)}
                              className="me-2"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <strong>Week {item.week}</strong>
                          </div>
                          <Badge bg={getPhaseColor(item.phase)}>
                            {item.phase}
                          </Badge>
                        </Card.Header>
                        <Card.Body>
                          <h6 className="card-title">{item.title}</h6>
                          <ul className="small text-muted mb-0">
                            {item.topics.map((topic, index) => (
                              <li key={index}>{topic}</li>
                            ))}
                          </ul>
                          {item.completed && (
                            <div className="mt-3">
                              <Badge bg="success">✅ Completed</Badge>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h3 className="mb-4">🏗️ System Design Learning Path (6 Weeks)</h3>
          <Row>
            {systemDesignRoadmap.map((item) => (
              <Col lg={4} md={6} key={item.week} className="mb-3">
                <Card 
                  className={`h-100 ${item.completed ? 'completed border-success' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleSystemDesignWeekCompletion(item.week)}
                >
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleSystemDesignWeekCompletion(item.week)}
                        className="me-2"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <strong>Week {item.week}</strong>
                    </div>
                    <Badge bg={getPhaseColor(item.phase)}>
                      {item.phase}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <h6 className="card-title">{item.title}</h6>
                    <ul className="small text-muted mb-0">
                      {item.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                    {item.completed && (
                      <div className="mt-3">
                        <Badge bg="success">✅ Completed</Badge>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">📚 Study Tips & Best Practices</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="mb-3">
                  <h6 className="text-primary">⏰ Time Management</h6>
                  <ul className="small text-muted">
                    <li>Dedicate 2-3 hours daily</li>
                    <li>Focus on one topic per week</li>
                    <li>Practice problems daily</li>
                    <li>Review and revise weekly</li>
                  </ul>
                </Col>
                <Col md={4} className="mb-3">
                  <h6 className="text-success">🎯 Problem-Solving Strategy</h6>
                  <ul className="small text-muted">
                    <li>Understand the problem first</li>
                    <li>Think of brute force solution</li>
                    <li>Optimize time/space complexity</li>
                    <li>Code and test thoroughly</li>
                  </ul>
                </Col>
                <Col md={4} className="mb-3">
                  <h6 className="text-warning">📖 Resources</h6>
                  <ul className="small text-muted">
                    <li>LeetCode premium</li>
                    <li>System Design Interview book</li>
                    <li>Mock interview platforms</li>
                    <li>FAANG interview experiences</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Roadmap;