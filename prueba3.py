import cv2
import mediapipe as mp
import numpy as np

# Función para calcular el ángulo entre tres puntos
def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians * 180.0 / np.pi)
    return angle if angle <= 180 else 360 - angle

# Inicialización de MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Ruta del video que sube el usuario (ajústala según el archivo subido)
video_path = "YanelliPrueba.mp4"
cap = cv2.VideoCapture(video_path)

# Variables para contar repeticiones y evaluar calidad
reps = 0
correct_reps = 0
flexion_completa = False

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convertir el frame a RGB
    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)

    # Si se detecta una pose
    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark

        # Obtener coordenadas de hombro, codo y muñeca (brazo derecho)
        shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                    landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
        elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                 landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
        wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                 landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

        # Calcular el ángulo del codo
        angle = calculate_angle(shoulder, elbow, wrist)

        # Evaluar flexión correcta
        if angle < 45 and not flexion_completa:  # Flexión completa detectada
            flexion_completa = True

        if angle > 150 and flexion_completa:  # Extensión completa detectada
            reps += 1
            flexion_completa = False  # Resetear para la siguiente repetición
            
            # Verificar si la repetición es correcta
            if 30 <= angle <= 45:
                correct_reps += 1

        # Dibujar ángulo en pantalla
        cv2.putText(frame, f"Angulo: {int(angle)}°", (50, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

        # Dibujar feedback en vivo
        if angle < 45:
            feedback = "Flexion completa"
            color = (0, 255, 0)  # Verde
        elif angle > 150:
            feedback = "Extension completa"
            color = (0, 0, 255)  # Rojo
        else:
            feedback = "Movimiento en progreso"
            color = (255, 255, 0)  # Amarillo

        cv2.putText(frame, feedback, (50, 100), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)

    # Mostrar video procesado
    cv2.imshow('Analisis de Curl de Biceps', frame)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# **Feedback final**
if reps > 0:
    calidad = (correct_reps / reps) * 100
    print(f"Total repeticiones: {reps}")
    print(f"Repeticiones correctas: {correct_reps} ({calidad:.2f}%)")
    
    if calidad > 80:
        print("✅ Excelente técnica! Sigue así! 💪🔥")
    elif 50 <= calidad <= 80:
        print("⚠️ Puedes mejorar la forma, mantén el control en cada repetición. 👍")
    else:
        print("❌ Técnica incorrecta. Reduce la velocidad y enfócate en la forma correcta.")
else:
    print("❌ No se detectaron repeticiones. Intenta nuevamente.")

