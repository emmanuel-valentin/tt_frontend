import cv2
import mediapipe as mp
import numpy as np
import os
from collections import deque  


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

#  suavizado del ángulo del codo
angle_buffer = deque(maxlen=5) 
def calculate_angle(a, b, c):
    """
    Calcula el ángulo en el punto b (codo) con los puntos:
    a: hombro, b: codo, c: muñeca/dedo índice.
    """
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    return angle if angle <= 180 else 360 - angle

# Inicialización de MediaPipe Pose Landmarker
BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Ruta del modelo entrenado 
model_path = r"C:\Users\Windows\Desktop\Media Pipie\pose_landmarker.task"

# Configuración de la tarea Pose Landmarker
options = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=model_path),
    running_mode=VisionRunningMode.VIDEO
)

# Inicializar captura de video
cap = cv2.VideoCapture(0)

# Crear el marcador de poses
with PoseLandmarker.create_from_options(options) as landmarker:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        frame = cv2.flip(frame, 1)
        height, width, _ = frame.shape  # Obtener dimensiones del video

        # Convertir imagen para MediaPipe
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)

        # Procesar imagen con Pose Landmarker
        pose_results = landmarker.detect_for_video(mp_image, int(cv2.getTickCount() / cv2.getTickFrequency() * 1000))

        # Dibujar resultados solo si hay detección previa
        if pose_results and pose_results.pose_landmarks:
            landmarks = pose_results.pose_landmarks[0]  # Tomar la primera detección de pose

            # Convertir coordenadas normalizadas a píxeles
            def get_coords(landmark):
                return int(landmark.x * width), int(landmark.y * height)

            # Puntos del **brazo**
            shoulder = get_coords(landmarks[11])  # Hombro izquierdo
            elbow = get_coords(landmarks[13])  # Codo izquierdo
            wrist_or_finger = get_coords(landmarks[19])  # Se usa dedo índice en vez de muñeca

            # Calcular el ángulo del codo
            angle = calculate_angle(shoulder, elbow, wrist_or_finger)

            # Filtrar ángulo con un promedio móvil
            angle_buffer.append(angle)
            smoothed_angle = np.mean(angle_buffer)

            # Determinar estado del movimiento
            if smoothed_angle < 45:
                estado = "Flexion completa"
                color = (0, 255, 0)  # Verde
            elif smoothed_angle > 150:
                estado = "Extension completa"
                color = (0, 0, 255)  # Rojo
            else:
                estado = "Movimiento en progreso"
                color = (255, 255, 0)  # Amarillo

            # Dibujar solo la flexión del codo
            cv2.circle(frame, shoulder, 8, (255, 0, 0), -1)  # Hombro en azul
            cv2.circle(frame, elbow, 8, color, -1)  # Codo con color según estado
            cv2.circle(frame, wrist_or_finger, 8, (0, 0, 255), -1)  # Dedo índice en rojo

            cv2.line(frame, shoulder, elbow, (255, 255, 255), 3)
            cv2.line(frame, elbow, wrist_or_finger, (255, 255, 255), 3)

            # Mostrar ángulo y estado en pantalla
            cv2.putText(frame, f"Angulo: {int(smoothed_angle)}°", (50, 50), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            cv2.putText(frame, estado, (50, 100), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)

        cv2.imshow('Flexion de Codo - MediaPipe Pose', frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
