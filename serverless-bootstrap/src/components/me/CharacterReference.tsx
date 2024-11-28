import Container from 'react-bootstrap/Container';

const references = [
  {
    name: 'Shaun McCarthy - Fabric, Director',
    link: 'https://www.linkedin.com/in/shaun-mccarthy-aa54ab31/',
  },
  {
    name: 'Liam McCarthy - Fabric, EVP',
    link: 'https://www.linkedin.com/in/liam-mccarthy-8ba41631/',
  },
  {
    name: 'Jacky Wong - Fabric, Software Team Manager',
    link: 'https://www.linkedin.com/in/jacky-w-02329917b/',
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
      </div>
    );
  });
}

function CharacterReference() {
  return (
    <Container className="mt-5">
      <div>
        <h2 className="text-left">Character Reference</h2>
        {render()}
      </div>
    </Container>
  );
}

export { CharacterReference };
