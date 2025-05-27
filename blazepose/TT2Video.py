# Importación de librerías
import cv2
import mediapipe as mp
import numpy as np

# Inicializamos herramientas de dibujo y el modelo de pose de MediaPipe
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# Función para calcular el ángulo entre tres puntos (a, b, c) usando trigonometría
def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle

# Ruta del video grabado 
video_path = "video.mp4"

# Inicia la captura de video desde el archivo
cap = cv2.VideoCapture(video_path)

# Variables para contar repeticiones y etapa del movimiento
counter = 0
correct_reps = 0  # Para contar las repeticiones correctas
stage = None

# Iniciamos el modelo de MediaPipe Pose
with mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convertimos imagen a RGB para procesar con MediaPipe
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        results = pose.process(image)
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        try:
            # Obtenemos los puntos de referencia (landmarks) del cuerpo
            landmarks = results.pose_landmarks.landmark

            # Determinamos si usar el brazo izquierdo o derecho (el más visible)
            left_visibility = landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].visibility
            right_visibility = landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].visibility
            use_left = left_visibility > right_visibility

            if use_left:
                # Coordenadas del hombro, codo y muñeca izquierdos
                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                         landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                         landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            else:
                # Coordenadas del hombro, codo y muñeca derechos
                shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                            landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                         landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                         landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

            # Calculamos el ángulo del codo
            angle = calculate_angle(shoulder, elbow, wrist)

            # Mostramos el ángulo en la imagen
            cv2.putText(image, str(round(angle, 2)),
                        tuple(np.multiply(elbow, [640, 480]).astype(int)),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

            # Lógica para contar repeticiones
            if angle > 160:
                stage = "down"  # Cuando el ángulo es mayor a 160, el movimiento está hacia abajo
            if angle < 30 and stage == "down":  # Cuando el ángulo es menor a 30, el movimiento está hacia arriba
                stage = "up"
                counter += 1
                correct_reps += 1  # Solo cuenta la repetición como correcta si se completó el ciclo

        except:
            pass  # En caso de error, continuar sin interrupciones

        # Dibujamos un cuadro informativo
        cv2.rectangle(image, (0, 0), (250, 60), (0, 102, 204), -1)

        # Mostramos contador de repeticiones
        cv2.putText(image, 'REPS', (10, 20),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
        cv2.putText(image, str(counter), (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.8, (255, 255, 255), 2)

        # Mostramos el número de repeticiones correctas
        cv2.putText(image, 'CORRECT REPS', (110, 20),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
        cv2.putText(image, str(correct_reps), (110, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.8, (255, 255, 255), 2)

        # Mostramos estado actual del movimiento (up/down)
        cv2.putText(image, 'STAGE', (210, 20),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)
        cv2.putText(image, stage if stage else '-', (210, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.8, (255, 255, 255), 2)

        # Dibujamos los puntos de referencia y conexiones del cuerpo
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                  mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                  mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

        # Mostramos la imagen con anotaciones
        cv2.imshow('Mediapipe Feed', image)

        # Salir si se presiona la tecla 'q'
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

# Liberamos recursos
cap.release()
cv2.destroyAllWindows()
