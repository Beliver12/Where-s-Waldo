import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DisplayImages } from '../routes/Play';

describe('DisplayImages', async () => {
    it('should display images when isCliked is true, positionX and positionY is provided', async () => {
      render(
          <DisplayImages isClicked={true} positionX={123} positionY={544}/>      
      );
      expect(screen.getByRole('list')).toHaveTextContent(/guy/i);
     
    });
  
    it('should render nothing when isCliked is false, positionX and positionY is not provided', () => {
        const list = screen.queryByText('guy');
      render( <DisplayImages isClicked={false} />   );
  
      expect(list).not.toBeInTheDocument()
      screen.debug()
    });
  });