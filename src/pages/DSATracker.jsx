import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, ProgressBar, Badge, Accordion } from 'react-bootstrap';
import { useData } from '../context/DataContext';

const DSATracker = () => {
  const { dsaTopics, setDsaTopics, getDSAProgress } = useData();

  const toggleSubtopic = (topicId, subtopicId) => {
    setDsaTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === topicId
          ? {
              ...topic,
              subtopics: topic.subtopics.map(subtopic =>
                subtopic.id === subtopicId
                  ? { ...subtopic, completed: !subtopic.completed }
                  : subtopic
              ),
            }
          : topic
      )
    );
  };

  const getTopicProgress = (topic) => {
    const completed = topic.subtopics.filter(sub => sub.completed).length;
    return Math.round((completed / topic.subtopics.length) * 100);
  };

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'secondary';
    }
  };

  const totalProblems = dsaTopics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
  const completedProblems = dsaTopics.reduce(
    (acc, topic) => acc + topic.subtopics.filter(sub => sub.completed).length,
    0
  );
  const overallProgress = getDSAProgress();

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h1 className="display-6 fw-bold mb-4">🧮 DSA Tracker</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h5 className="mb-2">Overall DSA Progress</h5>
                  <ProgressBar now={overallProgress} variant="primary" className="mb-2" />
                  <small className="text-muted">
                    {completedProblems} of {totalProblems} problems completed
                  </small>
                </Col>
                <Col md={4} className="text-center">
                  <h2 className="text-primary mb-0">{overallProgress}%</h2>
                  <small className="text-muted">Complete</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Accordion>
            {dsaTopics.map((topic) => {
              const progress = getTopicProgress(topic);
              const completedCount = topic.subtopics.filter(sub => sub.completed).length;
              
              return (
                <Accordion.Item key={topic.id} eventKey={topic.id.toString()}>
                  <Accordion.Header>
                    <div className="d-flex justify-content-between align-items-center w-100 me-3">
                      <div className="d-flex align-items-center">
                        <span className="me-3 fs-4">{topic.icon}</span>
                        <div>
                          <h6 className="mb-1">{topic.name}</h6>
                          <small className="text-muted">
                            {completedCount}/{topic.subtopics.length} completed
                          </small>
                        </div>
                      </div>
                      <div style={{ width: '120px' }}>
                        <ProgressBar now={progress} variant="primary" size="sm" />
                        <small className="text-muted">{progress}%</small>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {topic.subtopics.map((subtopic) => (
                        <Col lg={6} className="mb-3" key={subtopic.id}>
                          <Card className={`h-100 ${subtopic.completed ? 'border-success' : ''}`}>
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <Form.Check
                                  type="checkbox"
                                  id={`subtopic-${subtopic.id}`}
                                  label={subtopic.name}
                                  checked={subtopic.completed}
                                  onChange={() => toggleSubtopic(topic.id, subtopic.id)}
                                  className="flex-grow-1"
                                />
                                <Badge
                                  bg={getDifficultyVariant(subtopic.difficulty)}
                                  className="ms-2"
                                >
                                  {subtopic.difficulty}
                                </Badge>
                              </div>
                              {subtopic.completed && (
                                <small className="text-success">
                                  ✅ Completed
                                </small>
                              )}
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default DSATracker;