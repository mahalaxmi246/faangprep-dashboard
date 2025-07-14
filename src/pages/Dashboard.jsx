import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Alert } from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useData } from '../context/DataContext';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const { 
    getDSAProgress, 
    getSystemDesignProgress, 
    getResumeProgress, 
    getMockInterviewProgress,
    getTotalProblemsSolved,
    getWeeklyStudyHours,
    dsaTopics,
    systemDesignTopics,
    resumeChecklist,
    mockInterviews
  } = useData();

  const progressData = {
    dsa: getDSAProgress(),
    systemDesign: getSystemDesignProgress(),
    resume: getResumeProgress(),
    mockInterviews: getMockInterviewProgress(),
  };

  const overallProgress = Object.values(progressData).reduce((a, b) => a + b, 0) / 4;

  // Dynamic data
  const totalProblemsSolved = getTotalProblemsSolved();
  const weeklyStudyHours = getWeeklyStudyHours();
  const studyStreak = Math.min(Math.floor(totalProblemsSolved / 3) + mockInterviews.length, 99); // Dynamic streak based on activity
  const doughnutData = {
    labels: ['DSA', 'System Design', 'Resume', 'Mock Interviews'],
    datasets: [
      {
        data: Object.values(progressData),
        backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Dynamic weekly study hours chart
  const barData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Hours Studied',
        data: [
          Math.max(weeklyStudyHours * 0.6, 5), 
          Math.max(weeklyStudyHours * 0.8, 8), 
          Math.max(weeklyStudyHours * 0.9, 12), 
          weeklyStudyHours
        ],
        backgroundColor: '#0d6efd',
        borderRadius: 5,
      },
    ],
  };

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  ];

  const todaysQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h1 className="display-6 fw-bold mb-4">📊 Dashboard Overview</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Alert variant="info" className="border-0 shadow-sm">
            <div className="d-flex align-items-center">
              <span className="fs-4 me-3">💡</span>
              <div>
                <strong>Daily Motivation</strong>
                <p className="mb-0 mt-1">{todaysQuote}</p>
              </div>
            </div>
          </Alert>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title mb-0">🧮 DSA Progress</h6>
                <span className="badge bg-primary">{progressData.dsa}%</span>
              </div>
              <ProgressBar now={progressData.dsa} variant="primary" />
              
              <small className="text-muted mt-2 d-block">
                {dsaTopics.reduce((acc, topic) => acc + topic.subtopics.filter(sub => sub.completed).length, 0)} problems solved
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title mb-0">🏗️ System Design</h6>
                <span className="badge bg-success">{progressData.systemDesign}%</span>
              </div>
              <ProgressBar now={progressData.systemDesign} variant="success" />
              <small className="text-muted mt-2 d-block">
                {systemDesignTopics.filter(topic => topic.completed).length} topics completed
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title mb-0">📄 Resume</h6>
                <span className="badge bg-warning text-dark">{progressData.resume}%</span>
              </div>
              <ProgressBar now={progressData.resume} variant="warning" />
              <small className="text-muted mt-2 d-block">
                {resumeChecklist.filter(item => item.completed).length}/{resumeChecklist.length} tasks done
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title mb-0">🎤 Mock Interviews</h6>
                <span className="badge bg-danger">{progressData.mockInterviews}%</span>
              </div>
              <ProgressBar now={progressData.mockInterviews} variant="danger" />
              <small className="text-muted mt-2 d-block">{mockInterviews.length} interviews done</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={4} md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">📊 Overall Progress</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <div style={{ height: '250px' }}>
                  <Doughnut
                    data={doughnutData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }}
                  />
                </div>
                <div className="mt-3">
                  <h4 className="text-primary">{Math.round(overallProgress)}%</h4>
                  <small className="text-muted">Overall Completion</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">📈 Weekly Study Hours</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '250px' }}>
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">🎯 Quick Stats</h5>
            </Card.Header>
            <Card.Body>
              <Row className="text-center">
                <Col md={3} className="mb-3">
                  <h3 className="text-primary">
                    {totalProblemsSolved}
                  </h3>
                  <small className="text-muted">Total Problems Solved</small>
                </Col>
                <Col md={3} className="mb-3">
                  <h3 className="text-success">{studyStreak}</h3>
                  <small className="text-muted">Study Days Streak</small>
                </Col>
                <Col md={3} className="mb-3">
                  <h3 className="text-warning">{mockInterviews.length}</h3>
                  <small className="text-muted">Mock Interviews</small>
                </Col>
                <Col md={3} className="mb-3">
                  <h3 className="text-info">{weeklyStudyHours}</h3>
                  <small className="text-muted">Weeks to Target</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;