import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useData } from '../context/DataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MockInterviewLogger = () => {
  const { mockInterviews, setMockInterviews, getMockInterviewProgress } = useData();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    topic: '',
    date: '',
    feedback: '',
    rating: 5,
    interviewer: '',
    duration: 45,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInterview = {
      id: mockInterviews.length + 1,
      ...formData,
    };
    setMockInterviews([newInterview, ...mockInterviews]);
    setFormData({
      company: '',
      topic: '',
      date: '',
      feedback: '',
      rating: 5,
      interviewer: '',
      duration: 45,
    });
    setShowForm(false);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'success';
    if (rating >= 6) return 'warning';
    return 'danger';
  };

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Average Rating',
        data: [6, 6.5, 7, 7.2, 7.8, 8.1],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Number of Interviews',
        data: [2, 3, 2, 4, 3, 2],
        borderColor: '#198754',
        backgroundColor: 'rgba(25, 135, 84, 0.1)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Interview Progress Over Time',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Rating (1-10)',
        },
        min: 0,
        max: 10,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Number of Interviews',
        },
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
        max: 5,
      },
    },
  };

  const averageRating = mockInterviews.length > 0 
    ? (mockInterviews.reduce((sum, interview) => sum + interview.rating, 0) / mockInterviews.length).toFixed(1)
    : '0';

  const topicDistribution = mockInterviews.reduce((acc, interview) => {
    const category = interview.topic.includes('DSA') ? 'DSA' : 
                    interview.topic.includes('System Design') ? 'System Design' : 'Behavioral';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-6 fw-bold">🎤 Mock Interview Logger</h1>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              + Add New Interview
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{mockInterviews.length}</h3>
              <small className="text-muted">Total Interviews</small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{averageRating}</h3>
              <small className="text-muted">Average Rating</small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{topicDistribution['DSA'] || 0}</h3>
              <small className="text-muted">DSA Interviews</small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{topicDistribution['System Design'] || 0}</h3>
              <small className="text-muted">System Design</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">📈 Progress Tracking</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">📋 Interview History</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Company</th>
                    <th>Topic</th>
                    <th>Interviewer</th>
                    <th>Duration</th>
                    <th>Rating</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInterviews.map((interview) => (
                    <tr key={interview.id}>
                      <td>{new Date(interview.date).toLocaleDateString()}</td>
                      <td>
                        <Badge bg="secondary">{interview.company}</Badge>
                      </td>
                      <td>{interview.topic}</td>
                      <td>
                        <small className="text-muted">{interview.interviewer}</small>
                      </td>
                      <td>{interview.duration} min</td>
                      <td>
                        <Badge bg={getRatingColor(interview.rating)}>
                          {interview.rating}/10
                        </Badge>
                      </td>
                      <td>
                        <small className="text-muted">
                          {interview.feedback.length > 60 
                            ? `${interview.feedback.substring(0, 60)}...` 
                            : interview.feedback}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🎤 Add New Mock Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Select
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    required
                  >
                    <option value="">Select Company</option>
                    <option value="Google">Google</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Apple">Apple</option>
                    <option value="Meta">Meta</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Topic</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., DSA - Trees and Graphs, System Design - Chat System"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    min="15"
                    max="120"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Interviewer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., John Doe (Ex-Google SWE)"
                    value={formData.interviewer}
                    onChange={(e) => setFormData({...formData, interviewer: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating (1-10)</Form.Label>
                  <Form.Range
                    min="1"
                    max="10"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  />
                  <div className="text-center">
                    <Badge bg={getRatingColor(formData.rating)}>
                      {formData.rating}/10
                    </Badge>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Feedback & Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter detailed feedback, areas for improvement, and key takeaways..."
                value={formData.feedback}
                onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Interview
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MockInterviewLogger;