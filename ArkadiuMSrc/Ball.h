#pragma once

#include "zakengine/zak.h"

using namespace zak;

class Ball : public Shape {
public:
	Ball();
	~Ball();

	bool Initialize();
	void OnCollide(Entity2D *entity);
	void Update(float dt);
	void SetSticky(bool isSticky) {_isSticky = isSticky; }
	bool GetSticky() { return _isSticky; }
	void SetVX(float vx){ _vx = vx; }
	void SetVY(float vy){ _vy = vy; }

private:

	void BoundX() { _vx *= -1; }
	void BoundY() { _vy *= -1; }
	
	float _vx;
	float _vy;
	bool _isSticky;
	};