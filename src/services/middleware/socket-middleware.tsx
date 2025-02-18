import { Middleware, MiddlewareAPI, Dispatch, AnyAction, UnknownAction } from 'redux';
import { string } from 'prop-types';

type WebSocketMiddlewareOptions = {
  url: string;
  actions: {
    connect: string;
    disconnect: string;
    sendMessage: string;
    onConnected: string;
    onDisconnected: string;
    onMessageReceived: string;
    onError: string;
  };
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
};

function createWebSocketMiddleware(options: WebSocketMiddlewareOptions): Middleware<{}, any, Dispatch<UnknownAction>> {
  let socket: WebSocket | null = null;

  return ((store: MiddlewareAPI) => (next: Dispatch<UnknownAction>) => (action: AnyAction): AnyAction => {
    const { actions } = options;

    switch (action.type) {
      case actions.connect: {
        if (socket !== null) {
          console.warn('WebSocket is already connected.');
          return next(action);
        }

        const url = options.url === 'wss://norma.nomoreparties.space/orders/all' 
          ? options.url 
          : `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken')?.slice(7)}`;

        socket = new WebSocket(url);

        socket.onopen = (event) => {
          options.onOpen?.(event);
          store.dispatch({ type: actions.onConnected });
        };

        socket.onclose = (event) => {
          options.onClose?.(event);
          store.dispatch({ 
            type: actions.onDisconnected, 
            payload: { code: event.code, reason: event.reason } 
          });
          socket = null;
        };

        socket.onmessage = (event) => {
          options.onMessage?.(event);
          store.dispatch({ 
            type: actions.onMessageReceived, 
            payload: event.data
          });
        };

        socket.onerror = (event) => {
          options.onError?.(event);
          store.dispatch({ 
            type: actions.onError, 
            payload: { message: 'WebSocket error' } 
          });
        };

        break;
      }

      case actions.disconnect: {
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      }

      case actions.sendMessage: {
        if (socket !== null && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(action.payload));
        } else {
          console.warn('WebSocket is not open. Cannot send message.');
        }
        break;
      }

      default:
        break;
    }

    return next(action);
  }) as Middleware<{}, any, Dispatch<UnknownAction>>;
}

export default createWebSocketMiddleware;