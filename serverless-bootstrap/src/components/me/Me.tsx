import AboutMe from './AboutMe';
import Certifications from './Certifications';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Stacks from './Stacks';
import ProfilePicture from './ProfilePicture';
import { Portfolio } from './Portfolio';
import { CharacterReference } from './CharacterReference';

function Me() {
  return (
    <div>
      <ProfilePicture />
      <AboutMe />
      <Stacks />
      <Certifications />
      <WorkExperience />
      <Education />
      <Portfolio />
      <CharacterReference />
    </div>
  );
}

export default Me;
