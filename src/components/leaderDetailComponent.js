import React from 'react';
import {Media,} from 'reactstrap';
import {Stagger,Fade} from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';
function Leader(props)
{
    const leaders = props.leaders.map((leader) => {
        return (
          <Stagger in>
            <Media className="pt-3">
            <Media  >
              <Media object src={baseUrl+ leader.image} alt={leader.name} />
            </Media>
            <Fade in>
            <Media className="pl-4 pb-5 " body>
              <Media heading>
                {leader.name}
              </Media>
              <Media className="pb-2" subtitle>{leader.designation}</Media>
                {leader.description}
             </Media>
             </Fade>
          </Media>
          </Stagger>
        ); 
    });
    return (
        <div>
            {leaders}
        </div>
    );
}
export default Leader;