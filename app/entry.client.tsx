import {startTransition} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {HydratedRouter} from 'react-router/dom';

// Removing StrictMode to reduce demo confusion
startTransition(() => {
  hydrateRoot(document, <HydratedRouter />);
});
