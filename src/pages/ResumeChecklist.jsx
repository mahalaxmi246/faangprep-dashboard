import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, ProgressBar, Badge, Alert } from 'react-bootstrap';
import { useData } from '../context/DataContext';

const ResumeChecklist = () => {
  const { resumeChecklist, setResumeChecklist, getResumeProgress } = useData();

  const toggleTask = (id) => {
    setResumeChecklist(resumeChecklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Format & Structure': return '📄';
      case 'Content': return '✍️';
      case 'ATS Optimization': return '🤖';
      case 'Review & Polish': return '✨';
      default: return '📋';
    }
  };

  const categories = [...new Set(resumeChecklist.map(item => item.category))];
  const completedCount = resumeChecklist.filter(item => item.completed).length;
  const overallProgress = getResumeProgress();

  const highPriorityIncomplete = resumeChecklist.filter(item => item.priority === 'High' && !item.completed).length;

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h1 className="display-6 fw-bold mb-4">📄 Resume Checklist</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-2">Resume Completion Progress</h5>
                  <ProgressBar now={overallProgress} variant="warning" className="mb-2" />
                  <small className="text-muted">
                    {completedCount} of {resumeChecklist.length} tasks completed
                  </small>
                </Col>
                <Col md={4} className="text-center">
                  <h2 className="text-warning mb-0">{overallProgress}%</h2>
                  <small className="text-muted">Complete</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {highPriorityIncomplete > 0 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="warning">
              <Alert.Heading>⚠️ High Priority Items Pending</Alert.Heading>
              You have {highPriorityIncomplete} high-priority tasks remaining. These are critical for FAANG applications.
            </Alert>
          </Col>
        </Row>
      )}

      {categories.map(category => {
        const categoryItems = resumeChecklist.filter(item => item.category === category);
        const categoryCompleted = categoryItems.filter(item => item.completed).length;
        const categoryProgress = Math.round((categoryCompleted / categoryItems.length) * 100);

        return (
          <Row key={category} className="mb-4">
            <Col>
              <Card>
                <Card.Header>
                  <Row className="align-items-center">
                    <Col>
                      <h5 className="mb-0">
                        <span className="me-2">{getCategoryIcon(category)}</span>
                        {category}
                      </h5>
                    </Col>
                    <Col xs="auto">
                      <Badge bg={categoryProgress === 100 ? 'success' : 'secondary'}>
                        {categoryCompleted}/{categoryItems.length}
                      </Badge>
                    </Col>
                  </Row>
                  <ProgressBar
                    now={categoryProgress}
                    variant={categoryProgress === 100 ? 'success' : 'primary'}
                    size="sm"
                    className="mt-2"
                  />
                </Card.Header>
                <Card.Body>
                  <Row>
                    {categoryItems.map(item => (
                      <Col lg={6} key={item.id} className="mb-3">
                        <Card className={`h-100 ${item.completed ? 'border-success bg-light' : ''}`}>
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <Form.Check
                                type="checkbox"
                                id={`task-${item.id}`}
                                label={item.task}
                                checked={item.completed}
                                onChange={() => toggleTask(item.id)}
                                className="flex-grow-1 fw-bold"
                              />
                              <Badge bg={getPriorityVariant(item.priority)} className="ms-2">
                                {item.priority}
                              </Badge>
                            </div>
                            <p className="text-muted small mb-0">{item.description}</p>
                            {item.completed && (
                              <div className="mt-2">
                                <Badge bg="success">
                                  ✅ Completed
                                </Badge>
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <h5>🎯 Resume Tips for FAANG</h5>
              <Row className="mt-3">
                <Col md={4} className="mb-3">
                  <h6 className="text-primary">💡 Key Focus Areas</h6>
                  <small className="text-muted">
                    Emphasize system design projects, scalable solutions, and impact metrics
                  </small>
                </Col>
                <Col md={4} className="mb-3">
                  <h6 className="text-success">📊 Quantify Everything</h6>
                  <small className="text-muted">
                    Include performance improvements, user growth, cost savings, or efficiency gains
                  </small>
                </Col>
                <Col md={4} className="mb-3">
                  <h6 className="text-warning">🤖 ATS Friendly</h6>
                  <small className="text-muted">
                    Use standard formatting and include relevant keywords from job descriptions
                  </small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeChecklist;