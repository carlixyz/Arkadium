#include "Ball.h"
Ball::Ball(){
	//su velocidad inicial
	_vx = 0.0f;
	_vy = 0.0f;

}
Ball::~Ball(){
}
bool Ball::Initialize() {
	SetShape(ZAK_SHAPE_QUAD); //Forma
	SetRotating(true); 
	SetRotationSpeed(-2.0f);
	SetDim(20,20); //Tamaño
	SetPos(0,0); // Posición Inicial
	SetColor(0xFF0000FF); //Color del Mc Guffin
	SetCollisionType(Entity2D::eCollisionBBox);
	SetCollisionSize(20,20);
	SetCollisionPos(0,0);
	SetCheckCollision(true); //Deseamos chequear colisión
//su velocidad inicial
	_vx = 0.3f;
	_vy = 0.3f;

	//al inicio estará pegada al pad
	_isSticky = true;

	return true;
}
void Ball::OnCollide(Entity2D *entity) {
	SetToPreviousPosition();
	BoundY();
	Update(0.01f);
}
void Ball::Update(float dt) {
	float x = GetPosX();
	float y = GetPosY();
	float w = (float) g_renderer.GetViewPortWidth();
	float h = (float) g_renderer.GetViewPortHeight();

	//Actualizo el shape
	Shape::Update(dt);

	// Actualizamos la posición respecto de la velocidad y el tiempo
	x += _vx * dt;
	y += _vy * dt;

	// verifico si estoy fuera del margen derecho
	if (x > w/2-GetWidth()/2) {
		x = w/2-GetWidth()/2;
		BoundX();

	//Verifico si estoy Afuera del margen izquierdo
	} else if (x < -w/2+GetWidth()/2) {
		x = -w/2+GetWidth()/2;
		BoundX();
	}
	// verifico si estoy fuera del margen superior
	if (y > h/2 - GetHeight()/2) {
		y = h/2 - GetHeight()/2;
		BoundY();

	//Verifico si estoy Afuera del margen inferior
	} else if (y < -h/2+GetHeight()/2) {
		SetSticky(true);
	}

	SetPos(x,y);
}