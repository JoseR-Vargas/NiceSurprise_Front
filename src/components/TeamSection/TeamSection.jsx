import { Container, Row, Col, Card } from 'react-bootstrap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './TeamSection.css';

const TeamSection = () => {
	const { ref, inView } = useScrollAnimation({ threshold: 0.2 });

	const teamMembers = [
		{
			initials: 'GDH',
			name: 'Genesis Diana Heredia',
			role: 'Fundadora de Nicesurprise',
		},
		{
			initials: 'JRV',
			name: 'Jose Rafael Vargas',
			role: 'Co-founder',
		},
	];

	return (
		<section
			ref={ref}
			className={`team-section ${inView ? 'visible' : 'hidden'}`}
		>
			<Container>
				<Row className="mb-5">
					<Col>
						<h2 className={`text-center team-title ${inView ? 'visible' : 'hidden'}`}>
							Conoce el equipo de Nicesurprise
						</h2>
					</Col>
				</Row>
				<Row className="justify-content-center">
					{teamMembers.map((member, index) => (
						<Col
							key={index}
							xs={12}
							md={6}
							lg={5}
							className={`mb-4 team-col ${inView ? 'visible' : 'hidden'}`}
							style={{
								transitionDelay: `${index * 0.2}s`,
							}}
						>
							<Card className="team-card">
								<Card.Body className="team-card-body">
									<div className="team-initials">{member.initials}</div>
									<Card.Title className="team-name">{member.name}</Card.Title>
									<Card.Text className="team-role">{member.role}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default TeamSection;

