#pragma once

#include "zakengine/zak.h"

using namespace zak;

const int MOVE_NONE = 0;
const int MOVING = 1;

class Pad : public Shape {
public:
	Pad();
	~Pad();

	bool Initialize();
	void OnCollide(Entity2D *entity);
	void Update(float dt);
	void SetAction(int action, float speed=0.0f) {
		_currentAction = action; _vx = speed;}
private:
	
	int _currentAction;
	float _vx;
};