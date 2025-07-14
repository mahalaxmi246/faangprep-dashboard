import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Badge } from 'react-bootstrap';
import { useData } from '../context/DataContext';

const SystemDesignTracker = () => {
  const { systemDesignTopics, setSystemDesignTopics, getSystemDesignProgress } = useData();

  const toggleCompletion = (id) => {
    setSystemDesignTopics(systemDesignTopics.map(topic =>
      topic.id === id ? { ...topic, completed: !topic.completed } : topic
    ));
  };

  const updateNotes = (id, notes) => {
    setSystemDesignTopics(systemDesignTopics.map(topic =>
      topic.id === id ? { ...topic, notes } : topic
    ));
  };

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Fundamentals': return '🏗️';
      case 'Databases': return '🗄️';
      case 'Caching': return '⚡';
      case 'Messaging': return '📨';
      case 'Architecture': return '🏛️';
      case 'Case Studies': return '💼';
      case 'Operations': return '⚙️';
      default: return '📚';
    }
  };

  const completedCount = systemDesignTopics.filter(topic => topic.completed).length;
  const progress = getSystemDesignProgress();

  const categories = [...new Set(systemDesignTopics.map(topic => topic.category))];

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h1 className="display-6 fw-bold mb-4">🏗️ System Design Tracker</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-2">Overall Progress</h5>
                  <div className="progress mb-2">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">
                    {completedCount} of {systemDesignTopics.length} topics completed
                  </small>
                </Col>
                <Col md={4} className="text-center">
                  <h2 className="text-success mb-0">{progress}%</h2>
                  <small className="text-muted">Complete</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {categories.map(category => (
        <Row key={category} className="mb-4">
          <Col>
            <h4 className="mb-3">
              <span className="me-2">{getCategoryIcon(category)}</span>
              {category}
            </h4>
            <Row>
              {systemDesignTopics
                .filter(topic => topic.category === category)
                .map(topic => (
                  <Col lg={6} xl={4} key={topic.id} className="mb-4">
                    <Card className={`h-100 ${topic.completed ? 'border-success' : ''}`}>
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="checkbox"
                            id={`topic-${topic.id}`}
                            checked={topic.completed}
                            onChange={() => toggleCompletion(topic.id)}
                            className="me-2"
                          />
                          <strong>{topic.title}</strong>
                        </div>
                        <Badge bg={getDifficultyVariant(topic.difficulty)}>
                          {topic.difficulty}
                        </Badge>
                      </Card.Header>
                      <Card.Body>
                        <p className="text-muted mb-3">{topic.description}</p>
                        
                        <Form.Group>
                          <Form.Label>
                            <small className="fw-bold">Notes & References:</small>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Add your notes, links, or thoughts about this topic..."
                            value={topic.notes}
                            onChange={(e) => updateNotes(topic.id, e.target.value)}
                          />
                        </Form.Group>
                        
                        {topic.completed && (
                          <div className="mt-3">
                            <Badge bg="success" className="me-2">
                              ✅ Completed
                            </Badge>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default SystemDesignTracker;