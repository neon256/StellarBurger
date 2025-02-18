import { Middleware, MiddlewareAPI, Dispatch, AnyAction, UnknownAction } from 'redux';

type WebSocketMiddlewareOptions = {
  wsUrl: string; // Базовый URL для WebSocket
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
    const { actions, wsUrl } = options;
    const { type, payload } = action;

    switch (type) {
      case actions.connect: {
        if (socket !== null) {
          console.warn('WebSocket is already connected.');
          return next(action);
        }
        //Не понял как делать через payload :(
        const token = localStorage.getItem('accessToken')?.slice(7);
        const fullUrl = token ? `${wsUrl}?token=${token}` : `${wsUrl}/all`;
        
        socket = new WebSocket(fullUrl);

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
          socket.send(JSON.stringify(payload));
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