import Container from 'react-bootstrap/Container';

const references = [
  {
    name: 'serverless-portfolio',
    link: 'https://github.com/gfreecs0510/serverless-portfolio',
    description: 'work in progress, compilation of my serverless portfolio',
  },
];

function render() {
  return references.map((ref) => {
    return (
      <div className="mt-4">
        <h5>
          <a href={ref.link} target="_blank" rel="noopener noreferrer">
            {ref.name}
          </a>
        </h5>
        <p>{ref.description}</p>
      </div>
    );
  });
}

function Portfolio() {
  return (
    <Container className="mt-5">
      <div>
        <h2 className="text-left">Portfolio</h2>
        {render()}
      </div>
    </Container>
  );
}

export { Portfolio };
